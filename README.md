# edu-interacting-with-workflows-typescript-code

This repository provides code used for exercises and demonstrations
included in the TypeScript version of the
[Interacting with Workflows](https://learn.temporal.io/courses/interacting-with-workflows)
training course.

It's important to remember that the example code used in this course was designed to support learning a specific aspect of Temporal, not to serve as a ready-to-use template for implementing a production system.

For the exercises, make sure to run `temporal server start-dev --ui-port 8080 --db-filename clusterdata.db` in one terminal to start the Temporal server. For more details on this command, please refer to the `Setting up a Local Development Environment` chapter in the course. Note: If you're using the Gitpod environment to run this exercise, you can skip this step.

## Hands-On Exercises

| Directory Name                        | Exercise                                                    |
| :------------------------------------ | :---------------------------------------------------------- |
| `exercises/sending-signals-external`  | [Exercise 1](exercises/sending-signals-external/README.md)  |
| `exercises/sending-signals-client`    | [Exercise 2](exercises/sending-signals-client/README.md)    |
| `exercises/querying-workflows`        | [Exercise 3](exercises/querying-workflows/README.md)        |
| `exercises/async-activity-completion` | [Exercise 4](exercises/async-activity-completion/README.md) |

Samples
Directory Name | Description
:----------------------------------| :---------------------------------------------------------------------------------------------------------------------
`samples/custom-search-attributes` | [Shows a sample of how to use Custom Search Attributes to find queries where the order for pizzas has failed](samples/custom-search-attributes)

## Reference

The following links provide additional information that you may find helpful as you work through this course.

- [General Temporal Documentation](https://docs.temporal.io/)
- [Temporal TypeScript SDK API Documentation](https://typescript.temporal.io)
- [GitPod Documentation: Troubleshooting](https://www.gitpod.io/docs/troubleshooting)

## Exercise Environment for this Course

You can launch an exercise environment for this course in GitPod by
clicking the button below:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/temporalio/edu-interacting-with-workflows-typescript-code)

Alternatively, you can perform these exercises directly on your computer. Refer to the instructions about setting up a local development environment, which you'll find in the "About this Course" chapter.
