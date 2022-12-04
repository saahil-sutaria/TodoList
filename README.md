OncoLens Frontend Engineering Assessment

Create a component in React that handles selecting items from a list. The input should have two columns - representing 'not added' and 'added' - items in the left column are possible selections, and the right column keeps track of items that have been added. This two-pane select input should satisfy the following requirements:

- Each list item has a text value (label) that is displayed, and an underlying identifier which is used to track whether it has been added or not

- Each list has a text input that allows you to filter down items in it

- Within each list, each item is selectable, and has some state change that shows it has been selected or de-selected

- A button exists for each list that allows you to move (add or un-add) a selected item from one list to another

- A button exists for each list that allows you to move all items from one list to another

- Each list displays a message if there are no items remaining in that list to act upon

- Each list has overflow scrolling when the list is too long (any arbitrary value you determine to be best is perfectly fine)

