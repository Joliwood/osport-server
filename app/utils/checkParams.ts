// utiiity function to check if the params are valid and return a number

function checkParams(params: any) {
  const parsedParams = parseInt(params, 10);

  if (Number.isNaN(parsedParams)) {
    throw new Error('Invalid params');
  }
  return parsedParams;
}

export default checkParams;
