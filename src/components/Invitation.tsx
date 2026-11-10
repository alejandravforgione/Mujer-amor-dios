const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;

const LINKS = {
  asistencia: 'https://wa.me/qr/VCUGSED5PPVJK1',
  youtube: 'https://youtube.com/@mujeramordios?si=sPTIOq2m5Xluvvqt',
  instagram: 'https://www.instagram.com/mujeramorydios?psln=MTc5NmZhcGJ5bWZiNg%3D%3D&utm_source=qr',
};

type InvitationLayer = {
  id: string;
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
  delay: number;
  animation: 'animate-fade-in' | 'animate-fade-in-up';
  href?: string;
};

const LAYERS: InvitationLayer[] = [
  { id: 'fondo', src: '/images/background.png', alt: '', x: 0, y: 0, w: 1080, h: 1920, delay: 0, animation: 'animate-fade-in' },
  { id: 'logo', src: '/images/LOGO.png', alt: 'Mujer, Amor & Dios', x: 285, y: 164, w: 612, h: 204, delay: 400, animation: 'animate-fade-in-up' },
  { id: 'titular', src: '/images/Titular.png', alt: '¡Estás Invitada!', x: 192, y: 500, w: 744, h: 110, delay: 900, animation: 'animate-fade-in-up' },
  { id: 'parrafo-1', src: '/images/Parrafo_1.png', alt: 'Un espacio para hablar de la vida, el amor, nuestros sueños, nuestras luchas y la fe. Un lugar donde cada mujer tiene un espacio, sin importar su historia o en qué momento de su camino se encuentre.', x: 255, y: 695, w: 610, h: 460, delay: 1500, animation: 'animate-fade-in-up' },
  { id: 'firma', src: '/images/FIRMA.png', alt: 'Mujer, Amor y Dios', x: 274, y: 1246, w: 640, h: 77, delay: 2100, animation: 'animate-fade-in-up' },
  { id: 'parrafo-2', src: '/images/Parrafo_2.png', alt: 'Tú historia también importa', x: 390, y: 1338, w: 402, h: 50, delay: 2600, animation: 'animate-fade-in-up' },
  { id: 'boton-asistencia', src: '/images/Confirma_tu_Asistencia.png', alt: 'Confirma tu Asistencia', x: 371, y: 1555, w: 448, h: 57, delay: 3000, animation: 'animate-fade-in-up', href: LINKS.asistencia },
  { id: 'boton-youtube', src: '/images/Canal_de_Youtube.png', alt: 'Canal de Youtube', x: 371, y: 1645, w: 448, h: 57, delay: 3250, animation: 'animate-fade-in-up', href: LINKS.youtube },
  { id: 'boton-instagram', src: '/images/Perfil_de_Instagram.png', alt: 'Perfil de Instagram', x: 371, y: 1729, w: 448, h: 57, delay: 3500, animation: 'animate-fade-in-up', href: LINKS.instagram },
];

const BUTTON_GLOW =
  'transition duration-500 ease-out group-hover:drop-shadow-[0_0_14px_rgba(254,226,190,0.85)] motion-reduce:transition-none';

function toPercent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

function InvitationLayerView({ layer }: { layer: InvitationLayer }) {
  const box = {
    left: toPercent(layer.x, CANVAS_WIDTH),
    top: toPercent(layer.y, CANVAS_HEIGHT),
    width: toPercent(layer.w, CANVAS_WIDTH),
    height: toPercent(layer.h, CANVAS_HEIGHT),
  };

    const image = (
    <img
      src={layer.src}
      alt={layer.alt}
      draggable={false}
      className={`block h-full w-full max-w-none select-none ${layer.animation} motion-reduce:animate-none ${layer.href ? BUTTON_GLOW : ''}`}
      style={{ animationDelay: `${layer.delay}ms` }}
    />
  );

  return (
    <div className="relative col-start-1 row-start-1">
      {layer.href ? (
        <a
          href={layer.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group absolute block rounded-full transition-transform duration-300 ease-out hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 motion-reduce:transition-none"
          style={box}
        >
          {image}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-[left] duration-700 ease-out group-hover:left-full motion-reduce:transition-none" />
          </span>
        </a>
      ) : (
        <div className="pointer-events-none absolute" style={box}>
          {image}
        </div>
      )}
    </div>
  );
}

export default function Invitation() {
  return (
    <div className="relative mx-auto grid aspect-[9/16] w-full max-w-[min(480px,calc(100dvh*0.5625))] grid-cols-1 grid-rows-1 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      {LAYERS.map((layer) => (
        <InvitationLayerView key={layer.id} layer={layer} />
      ))}
    </div>
  );
}
