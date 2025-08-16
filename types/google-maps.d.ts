declare global {
  interface Window {
    google: typeof google;
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    va?: (
      event: 'event' | 'beforeSend' | 'pageview',
      properties?: unknown
    ) => void;
  }

  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element | null, opts?: MapOptions);
        setCenter(latlng: LatLng | LatLngLiteral): void;
        setZoom(zoom: number): void;
        getZoom(): number;
        setOptions(options: MapOptions): void;
      }

      class Marker {
        constructor(opts?: MarkerOptions);
        setMap(map: Map | null): void;
        setPosition(latlng: LatLng | LatLngLiteral): void;
        setTitle(title: string): void;
      }

      class InfoWindow {
        constructor(opts?: InfoWindowOptions);
        open(map?: Map, anchor?: Marker): void;
        close(): void;
        setContent(content: string | Element): void;
      }

      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }

      class Circle {
        constructor(opts?: CircleOptions);
        setMap(map: Map | null): void;
        setCenter(center: LatLng | LatLngLiteral): void;
        setRadius(radius: number): void;
      }

      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        mapTypeId?: MapTypeId;
        disableDefaultUI?: boolean;
        zoomControl?: boolean;
        mapTypeControl?: boolean;
        scaleControl?: boolean;
        streetViewControl?: boolean;
        rotateControl?: boolean;
        fullscreenControl?: boolean;
        styles?: MapTypeStyle[];
      }

      interface MarkerOptions {
        position?: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        icon?: string | Icon | Symbol;
        label?: string | MarkerLabel;
        draggable?: boolean;
        clickable?: boolean;
        cursor?: string;
        opacity?: number;
        visible?: boolean;
        zIndex?: number;
      }

      interface InfoWindowOptions {
        content?: string | Element;
        disableAutoPan?: boolean;
        maxWidth?: number;
        pixelOffset?: Size;
        position?: LatLng | LatLngLiteral;
        zIndex?: number;
      }

      interface CircleOptions {
        center?: LatLng | LatLngLiteral;
        clickable?: boolean;
        draggable?: boolean;
        editable?: boolean;
        fillColor?: string;
        fillOpacity?: number;
        map?: Map;
        radius?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokePosition?: StrokePosition;
        strokeWeight?: number;
        visible?: boolean;
        zIndex?: number;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      interface MapTypeStyle {
        featureType?: string;
        elementType?: string;
        stylers?: Array<{ [key: string]: any }>;
      }

      interface Icon {
        url: string;
        size?: Size;
        scaledSize?: Size;
        origin?: Point;
        anchor?: Point;
      }

      interface Symbol {
        path: string | SymbolPath;
        anchor?: Point;
        fillColor?: string;
        fillOpacity?: number;
        labelOrigin?: Point;
        rotation?: number;
        scale?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
      }

      interface MarkerLabel {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
        text: string;
      }

      interface Size {
        width: number;
        height: number;
      }

      interface Point {
        x: number;
        y: number;
      }

      enum MapTypeId {
        HYBRID = 'hybrid',
        ROADMAP = 'roadmap',
        SATELLITE = 'satellite',
        TERRAIN = 'terrain'
      }

      enum StrokePosition {
        CENTER = 0,
        INSIDE = 1,
        OUTSIDE = 2
      }

      enum SymbolPath {
        BACKWARD_CLOSED_ARROW = 3,
        BACKWARD_OPEN_ARROW = 4,
        CIRCLE = 0,
        FORWARD_CLOSED_ARROW = 1,
        FORWARD_OPEN_ARROW = 2
      }
    }
  }
}

export {};