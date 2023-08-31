function paridad(num) {
  if (num % 2 == 0) {
    return "Número par";
  } else {
    return "Número impar";
  }
}

module.exports = { paridad };
