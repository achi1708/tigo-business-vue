import httpInstance from "./Base";

const CodeSrv = {
  async checkCodeOut(userCode) {
    try {
      const { data } = await httpInstance.post(`code/${userCode}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default CodeSrv;
