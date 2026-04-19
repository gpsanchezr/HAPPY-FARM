import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cliente, pedido, total, id } = body as any;

    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const token = process.env.WHATSAPP_TOKEN;
    const storeNumber = process.env.STORE_WHATSAPP_NUMBER; // E.164 format without plus, e.g. 5491123456789

    if (!phoneNumberId || !token || !storeNumber) {
      return NextResponse.json({ error: 'Missing WhatsApp configuration on server' }, { status: 500 });
    }

    const date = body.fecha || new Date().toLocaleString();

    const products = (pedido || []).map((it: any) => `- ${it.producto}: ${it.cantidad}`).join('\n');

    const message = `Nuevo pedido recibido\nID: ${id || 'N/A'}\nCliente: ${cliente?.nombre || ''}\nTel: ${cliente?.telefono || ''}\nDirección: ${cliente?.direccion || ''}\nProductos:\n${products}\nTotal: $${total}\nFecha: ${date}`;

    const endpoint = `https://graph.facebook.com/v15.0/${phoneNumberId}/messages`;

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: storeNumber,
        text: { body: message },
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return NextResponse.json({ error: 'WhatsApp API error', details: data }, { status: 502 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
}
