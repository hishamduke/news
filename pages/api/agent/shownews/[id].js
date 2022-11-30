export default async function handler(req, res) {
  let { id } = req.query;
  id = parseInt(id);
  try {
    console.log("shownews");
    let employee = await prisma.employee.findFirst({
      where: {
        id,
      },
    });
    const agent = await prisma.agent.findFirst({
      where: {
        accountid: employee.agentid,
      },
      select: {
        // This will work!
        newspapers: {},
      },
    });
    console.log(id);
    res.status(200).json(agent);
  } catch (e) {
    console.log(e);
  }
}
