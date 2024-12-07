import jwtDecode from 'jwt-decode';

export const getDecodedToken = (): any => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error al decodificar el token', error);
    return null;
  }
};
