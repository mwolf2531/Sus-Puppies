# Git Workflow Guidelines.
- The purpose of this markdown is to outline git workflow practices for the sus-puppies repo.
- Use ES6 syntax where possible. It is encouraged to use ES6+ as long as it is supported by the transpiler.
- Please add an extra space at the end of each file.

- JSX components must be named using pascal case: NameOfReactComp.jsx
- Everything else must be named using camel case: nameOfDirectoryOrJavascriptFile
- If there is a need to use a different naming scheme please bring it up to the team so we can update naming conventions.

- Please help maintain the Trello Ticket system so work being done is visible to all. In other words please generate and assign yourself to a ticket at the minimum before starting any work.
- Thank you

## Naming conventions
- Local branches do not follow any naming conventions
- Branches that are pushed up must follow this exampel: `YourFirstName/name-of-ticket-or-short-description-of-feature`.

## Making a Pull Requests
1. Cut a new branch on github.com using the outlined naming convention. A recommended CLI command: `git push origin name-of-local-branch:yourName/name-of-ticket-or-short-description-of-feature`
2. Do not push to `main` at any stage. Branches have to be code reviewed by one person and aproved. Note: Reviewer is the one who will merge to `main` branch while owner of branch will resolve any issues prior to this.
3. Create a pull request from your branch on github to `main`. Make sure to assign yourself to the pull request and choose one or all reviewers to check your code.
    - These options are found on the right hand side of the pull request screen.
    - Make sure to provide any relevant information in the comment section. Otherwise reach out to the team through slack or preferred medium.
4. Resolve any conversations with the reviewer including outstanding issues with the pull request.
5. Reviewer will merge the request once the code has been reviewed and no issues are found.
6. Delete the branch once it has been merged into main or is no longer relevant.
7. Update your Trello Ticket.

Note: Branches can become stale as other pull requests are made. It is the responsibility of both the reviewer and branch owner to ensure the branch is fresh prior to merging. This includes resolving merge conflicts. If the issues presented are difficult to resolve, reach out to the team to help. Do not get bogged down and become frustrated.

## Reviewing Code
- On the code through github or reach out directly to the branch owner. It is prefered to use github's reviewing tools
- When done reviewing message on slack or reach out to branch owner.
    - Branch owner will eventually check on the Pull request, reaching out via slack helps increase visibility when issues arise.
- If there is discussion that cannot be resolved such as a difference of opinion please reach out to the product managers: Himmat/Dare.
    - If it is Himmat and Dare please reach out to your team :]
- Encourage ES6 syntax where possible. Example: destructuring and using let/const.
- Positive feedback is encouraged.
- Make sure that as the reviewer you are also assigned to the ticket in Trello. Note: the branch owner is ultimately responsible for updating the ticket, but please ensure you are participating even as a reviewer.

