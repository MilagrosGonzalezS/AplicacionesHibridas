const suma = (num1, num2) => {
  return num1 + num2;
};

const division = (num1, num2) => {
  return num1 / num2;
};

const array = (lista) => {
  let mayor = lista[0];
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] > mayor) {
      mayor = lista[i];
    }
  }

  return mayor;
};

numeros = [2, 8, 9, 7, 5, 6];

console.log(suma(5, 10));
console.log(division(20, 2));
console.log(array(numeros));
