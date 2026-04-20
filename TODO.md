# TODO.md - Plan aprobado para fixes de imágenes y sintaxis

## ✅ Status Legend
- [ ] **Pending**
- [✅] **Completed**

## 📋 Pasos del plan (en orden lógico):

### 1. [ ] Crear este TODO.md (tracking progress)
### 2. [ ] Edit ProductCard.tsx 
   - Reescribir sección de validación de imagen con cleanUrl + .replace(/[\n\r]/g, '').trim()
   - Aplicar estructura JSX exacta solicitada (h-48, clases específicas)
   - Confirmar sintaxis line 74 fixed
### 3. [ ] Edit ProductCarousel.tsx 
   - Limpiar URLs hardcoded de Supabase con .replace(/[\n\r]/g, '').trim()
### 4. [ ] Edit VacaPro.tsx
   - Cambiar src="/imagenes/vaca-mascota.gif" → "/imagenes/vaca.png"
### 5. [ ] Verificar/testear
   - `npm run dev`
   - Check consola/network: no más 400/404 en imágenes
   - Confirmar ProductCard renderiza correctamente
### 6. [ ] attempt_completion

**Notas:** 
- Todos los <Image> ya tienen unoptimized={true}
- Cambios mínimos y precisos
- Preservar resto del código intacto

**Próximo paso actual: 2/6**
