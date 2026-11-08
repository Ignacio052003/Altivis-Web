/** Ficha de contacto: compone el mensaje y abre WhatsApp en un solo paso. */
export function iniciarContacto() {
  document.querySelectorAll<HTMLFormElement>('[data-contacto]').forEach((form) => {
    const grupos = form.querySelectorAll<HTMLElement>('[data-campos]');
    const error = form.querySelector<HTMLElement>('[data-error]');
    const telefono = form.dataset.telefono || '';
    const hola = `Hola ${form.dataset.piloto || ''}`.trim();

    const setModo = (modo: string) => {
      form.dataset.modo = modo;
      grupos.forEach((g) => {
        const activo = g.dataset.campos === modo;
        g.hidden = !activo;
        g.querySelectorAll<HTMLInputElement>('input, select, textarea').forEach((c) => (c.disabled = !activo));
      });
      const radio = form.querySelector<HTMLInputElement>(`input[name="modo"][value="${modo}"]`);
      if (radio) radio.checked = true;
      if (error) error.hidden = true;
    };
    setModo(form.dataset.modo || 'grabacion');

    form.querySelectorAll<HTMLInputElement>('input[name="modo"]').forEach((r) =>
      r.addEventListener('change', () => setModo(r.value)),
    );

    // El diagrama del taller rellena la ficha con las piezas marcadas
    document.addEventListener('altivis:pieza', (e) => {
      const { piezas, servicios } = (e as CustomEvent).detail as { piezas: string[]; servicios: string[] };
      setModo('taller');
      const sel = form.querySelector<HTMLSelectElement>('[data-servicio]');
      if (sel) sel.value = servicios.length === 1 ? servicios[0] : servicios.length > 1 ? 'Varias cosas' : 'No lo sé';
      const desc = form.querySelector<HTMLTextAreaElement>('[data-desc-taller]');
      // Solo se sobrescribe si el texto lo había puesto el diagrama, nunca lo que escribió el piloto
      if (desc && (!desc.value || desc.dataset.auto === desc.value)) {
        desc.value = piezas.length ? `Creo que falla: ${piezas.join(', ')}. ` : '';
        desc.dataset.auto = desc.value;
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const modo = form.dataset.modo || 'grabacion';
      const datos = new FormData(form);
      const v = (k: string) => String(datos.get(k) || '').trim();

      const faltan: string[] = [];
      form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[required]').forEach((c) => {
        if (c.disabled || c.type === 'checkbox') return;
        if (!c.value.trim()) faltan.push((c.closest('label')?.querySelector('span')?.textContent || c.name).toLowerCase());
      });
      const privacidad = form.querySelector<HTMLInputElement>('input[name="privacidad"]');
      if (faltan.length) return mostrar(`Falta rellenar: ${faltan.join(', ')}.`);
      if (privacidad && !privacidad.checked) return mostrar('Marca la casilla de privacidad para continuar.');
      if (error) error.hidden = true;

      const l: (string | null)[] = [];
      if (modo === 'taller') {
        l.push(`${hola}, tengo un dron para el taller.`, '', `Nombre: ${v('nombre')}`);
        if (v('ciudad')) l.push(`Ciudad: ${v('ciudad')}`);
        l.push(`Dron: ${v('dron')}`, `Necesito: ${v('servicio')}`, '', v('descripcion'));
      } else if (modo === 'videografo') {
        l.push(`${hola}, soy videógrafo y me interesa añadir FPV a mis bodas.`, '', `Nombre: ${v('nombre')}`, `Estudio: ${v('marca')}`);
        if (v('ciudad')) l.push(`Ciudad: ${v('ciudad')}`);
        if (v('finca')) l.push(`Finca y fecha: ${v('finca')}`);
        l.push('', v('descripcion'));
      } else {
        l.push(`${hola}, quiero una propuesta de grabación.`, '', `Nombre: ${v('nombre')}`);
        if (v('ciudad')) l.push(`Ciudad: ${v('ciudad')}`);
        l.push(`Qué es: ${v('tipo')}`);
        if (v('fecha')) l.push(`Fecha aproximada: ${v('fecha')}`);
        l.push('', v('descripcion'));
      }
      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(l.join('\n'))}`;
      // Con 'noopener' window.open devuelve null siempre, así que se corta a mano.
      const ventana = window.open(url, '_blank');
      if (ventana) ventana.opener = null;
      else location.href = url;
    });

    function mostrar(msg: string) {
      if (!error) return;
      error.textContent = msg;
      error.hidden = false;
    }
  });
}
