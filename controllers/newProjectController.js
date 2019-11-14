export function newProjectController(req, res) {
  res.render("new-project", {
    hero: {
      header: "create new project"
    }
  });
}

export function projectCreateController(req, res) {
  console.log(req.body);
  res.send(req.body);
}
