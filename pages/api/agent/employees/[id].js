export default async function handler(req, res) {
  let { id } = req.query;
  id = parseInt(id);
  try {
    let employee = await prisma.employee.findFirst({
      where: {
        id,
      },
    });
    const agent = await prisma.accounts.findFirst({
      where: {
        id: employee.agentid,
      },
    });
    employee.agentName = agent.name;
    // if (guardnum.length > 0) {
    //   return res.status(404).json({ code: "P2002" });
    // } else {
    //   const account = await prisma.accounts.create({
    //     data: accountdata,
    //   });
    //   userdata.accountid = account.id;
    //   const user = await prisma.user.create({
    //     data: userdata,
    //   });
    // }
    res.status(200).json(employee);
  } catch (e) {
    console.log(e);
  }
}
