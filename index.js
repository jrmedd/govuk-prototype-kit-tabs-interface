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
  const urlParts = req.path.parts()
  const section = req.session.data.sections.find(section => section.name.url() === urlParts[0])
  if (section) {
    section.path = urlParts[0]
    section.requestPath = urlParts.at(1)
    section.tabs = section.tabs.map(tab => ({ ...tab, path: tab.name.url(), completePath: `/${section.name.url()}/${tab.name.url()}`, deepContentPath: urlParts.at(2) ?? ''}))
    section.activeTab = section.tabs.find(tab => tab.path === section.requestPath)
    section.activeTab.renderingDeepContent = urlParts.at(2) ? section.activeTab.deepContent.find(content => urlParts.at(2) === content.name.url()).content : false
    return res.render('layouts/tabs-layout.njk', {section, request: req})
  } else {
    res.render(req.path, {request: req})
  }
}

module.exports = { useStructure, pathPattern }
