export interface Empleado {
  id: string; // Ej: "EMP-001"
  name: string;
  role: string; // Mesero, Hostess, etc.
  shift: string; // Mañana (7am-3pm), Tarde (3pm-11pm), Noche (11pm-7am)
}