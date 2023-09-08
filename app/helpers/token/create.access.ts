import jwt from 'jsonwebtoken';

const { sign } = jwt;

// Small function to create signed token

function createToken(expireTime: string, ...props: any) {
  const token = sign({ ...props }, process.env.JWT_TOKEN_KEY as string, {
    expiresIn: expireTime,
  });
  return token;
}

export default createToken;
