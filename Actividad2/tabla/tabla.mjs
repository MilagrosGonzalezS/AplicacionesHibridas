export function tabla(num) {
  let lista = [];
  for (let i = 1; i < 13; i++) {
    lista.push(i * num);
  }
  return lista;
}
