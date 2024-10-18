String.prototype.url = function () {
    return this
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
}

String.prototype.parts = function() {
  return this
      .split('/')
      .slice(1)
}

const pathPattern = /^((?!\.(css|js|png|jpg|jpeg|json|gif|svg|ico|woff|woff2|ttf|eot)).)*$/

function useStructure(req, res, next) {
  const leftmost = req.path.parts()[0]
  const section = req.session.data.sections.find(section => section.name.url() === leftmost)
  if (section) {
    section.path = leftmost
    section.requestPath = req.path.parts().at(1)
    section.tabs = section.tabs.map(tab => ({ ...tab, path: tab.name.url()}))
    section.activeTab = section.tabs.find(tab => tab.path === section.requestPath)
    return res.render('layouts/tabs-layout.njk', {section})
  } else {
    res.render(req.path)
  }
}

module.exports = { useStructure, pathPattern }
