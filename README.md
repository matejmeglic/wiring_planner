# Wiring planner

This program runs on localhost and utilizes local storage to produce, save and export JSON with all parameters needed to draw basic wiring of a house or an apartment. 

# Change log

## Version 1 (20230226)
- setting up a single project (if you create another project, you will drop the previous one), 
- within that you can create multiple rooms and 
- within that, infinite walls that have
- electricity, water, pluming, ethernet and windows that can be places
- all the wires can have a single harness positioned
- each wall can have loft calculations
- you can save every room OR every wall to png
- you can export JSON to disk and upload it

### Room for improvement:
- state management is somehow broken, the changes are not immediate (the data is stored, but sometimes one needs a reload)
- there is a support for multiple harnesses, but currently the app only allows a single entry per wiring line (in JSON you can create multiple ones)
- major code revamp (the author was learning react hooks and overcomplicated the codebase, then left some quirks in there)


### TOTAL HOURS V1 : 71
- 4h basic canvas setup
- 6h windows work
- 6h rewrite to build canvas bottom up, json setup
- 4h uneven walls (loft support)
- 6h wiring set up + multiple walls
- 5h dropdown, material ui + form
- 5h setting states, navigation, demo modal, download JSON and storing data to LS
- 10h navigation panel, restructuring components, uploadJSON, createProjectForm, left menu (argh setData), edit and delete buttons
- 2h left menu splitted, edit rooms enhancements, roomDetails menu started
- 4h multi-level menu (walls, wallSettings)
- 5h wall handling+errorhandling + wallDetails menu
- 2h wiring submenu
- 8h rewrite up to working model (there is an edit walls bug)
- 4h polishing up, adding screenshot feature and basic testing