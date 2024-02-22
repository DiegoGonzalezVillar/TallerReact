export const buscarAlimento = (idAlimento, alimentos) => {
  const alimento = alimentos.find((a) => a.id === idAlimento);
  return alimento;
};
