const { USER_DATA } = require('../../db/data');
const { verifyToken, generateToken } = require('../helper/tokenFunctions');

module.exports = async (req, res) => {
  const accessToken = req.cookies['access_jwt'];
  const refreshToken = req.cookies['refresh_jwt'];
  const accessPayload = await verifyToken('access', accessToken);

  if (accessPayload) {
    const userInfo = { ...USER_DATA.filter((user) => user.id === accessPayload.id)[0] };
    if (!userInfo) {
      return res.status(401).send('Not Authorized');
    }
    delete userInfo.password;
    return res.json(userInfo);
  } else if (refreshToken) {
    const refreshPayload = await verifyToken('refresh', refreshToken);

    if (!refreshPayload) {
      return res.status(401).send('Not Authorized');
    }

    const userInfo = USER_DATA.filter((user) => user.id === refreshPayload.id)[0];
    const { accessToken } = await generateToken(userInfo);

    res.cookie('access_jwt', accessToken, {
      domain: 'localhost',
      path: '/',
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      // Expires 옵션이 없는 Session Cookie
    });

    return res.json({ ...userInfo, password: undefined });
  }
  return res.status(401).send('Not Authorized');
};
