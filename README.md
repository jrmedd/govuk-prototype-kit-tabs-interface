# GOVUK Prototype Kit Tabs Interface

This NPM package simplifies the use of a custom tabbed interface pattern created for the DVSA's "Manage your vehicle testing" service. It is designed for dashboard-style applications where users frequently check real-time, tabular data or perform routine tasks. While not ideal for all GOV.UK services, this pattern works well for regularly used, task-based services.

## Installation

To install the package, run the following command:

```bash
npm install govuk-prototype-kit-tabs-interface
```

## How It Works

The tabbed interface is defined in the `data/session-data-defaults.js` file, which outlines the sections and corresponding tabs.

Here’s an example structure:

```javascript
module.exports = {
  "sections": [
    {
      name: "Facility management",
      description: "Access your on-the-day completed test results and search your past transactions.",
      tabs: [
        {
          name: "Today's completed tests",
          content: 'todays-tests'
        },
        {
          name: "Search past transactions",
          content: 'past-transactions'
        }
      ]
    },
    {
      name: "Apply for a vehicle test",
      description: "Make an application for a specialist or technical test.",
      tabs: [
        {
          name: "Apply",
          content: "apply"
        },
        {
          name: "Current applications",
          content: "current"
        },
        {
          name: "Past applications",
          content: "past"
        }
      ]
    }
  ]
}
```

### Structure

* Sections: Each section corresponds to a tile on the homepage.
* Tabs: Within each section, tabs define the subpages under the section.

You can specify the content of each tab in the `app/views` folder using standard HTML or Nunjucks templates. The system automatically handles the routing and rendering for you.

In the above structure:
* The section “Facility management” includes two tabs:
  * “Today’s completed tests” (content from `views/todays-tests`)
  * “Search past transactions” (content from `views/past-transactions`)
* The section “Apply for a vehicle test” has three tabs:
  * “Apply” (content from `views/apply.njk`)
  * “Current applications” (content from `views/current.njk`)
  * “Past applications” (content from `views/past.njk`)

### Routing


When you create sections and tabs, routes are automatically generated. The routes are named by converting section names and tab names to lowercase and replacing spaces with hyphens.

For example, the route for “Today’s completed tests” under the “Facility management” section will be: `/facility-management/todays-completed-tests`

## How To Use

1.	Define the tabbed interface structure in the data/session-data-defaults.js file.
2.	Create the corresponding content for each tab in the app/views folder using HTML or Nunjucks.
3.	Once the package is installed, the rest of the functionality will work automatically.

## To-do / outstanding

* Homepage tiles
* Journeys within tabs i.e. a third URL segment e.g. `section/tab/step-one`
* Some error handling for when content pages don't exist
