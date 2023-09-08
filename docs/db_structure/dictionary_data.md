# Database Schema Dictionary

## Legend:
- **PK**: Primary Key
- **FK**: Foreign Key
- **UQ**: Unique Constraint
- **NN**: Not Null Constraint
- **DF**: Default Value Constraint

## Table: user
| Field        | Required | Data Type | Constraint   | Description                         |
|--------------|----------|-----------|--------------|-------------------------------------|
| id           | PK       | SERIAL    |              | User ID                             |
| email        | NN, UQ   | TEXT      |              | User's email                        |
| username     | NN, UQ   | TEXT      |              | User's username                     |
| password     | NN       | TEXT      |              | User's password hash                |
| avatar_url   |          | TEXT      | FK (image)   | URL to user's avatar image          |
| createdAt    |          | TIMESTAMP | DF (NOW)     | Creation timestamp                  |
| updatedAt    |          | TIMESTAMP |              | Last update timestamp               |

## Table: event
| Field            | Required | Data Type | Constraint    | Description                          |
|------------------|----------|-----------|---------------|--------------------------------------|
| id               | PK       | SERIAL    |               | Event ID                             |
| name             | NN       | TEXT      |               | Event name                           |
| location         | NN       | TEXT      |               | Event location                       |
| date             | NN       | TIMESTAMP |               | Event date and time                  |
| duration         | NN       | INTEGER   |               | Event duration in minutes            |
| nb_team          | NN       | INTEGER   |               | Number of teams participating        |
| nb_max_participant | NN     | INTEGER   |               | Maximum number of participants       |
| organizer_id     | NN       | INTEGER   | FK (user)     | ID of the event organizer (user)     |
| sport_id         | NN       | INTEGER   | FK (sport)    | ID of the sport associated with event|
| createdAt        |          | TIMESTAMP | DF (NOW)      | Creation timestamp                   |
| updatedAt        |          | TIMESTAMP |               | Last update timestamp                |

## Table: sport
| Field        | Required | Data Type | Constraint   | Description                         |
|--------------|----------|-----------|--------------|-------------------------------------|
| id           | PK       | SERIAL    |              | Sport ID                            |
| name         | NN, UQ   | TEXT      |              | Sport name                          |
| createdAt    |          | TIMESTAMP | DF (NOW)     | Creation timestamp                  |
| updatedAt    |          | TIMESTAMP |              | Last update timestamp               |

## Table: image
| Field        | Required | Data Type | Constraint   | Description                         |
|--------------|----------|-----------|--------------|-------------------------------------|
| id           | PK       | SERIAL    |              | Image ID                            |
| url          | NN, UQ   | TEXT      |              | URL of the image                    |
| title        | NN, UQ   | TEXT      |              | Image title                         |
| createdAt    |          | TIMESTAMP | DF (NOW)     | Creation timestamp                  |
| updatedAt    |          | TIMESTAMP |              | Last update timestamp               |

## Table: event_on_user
| Field        | Required | Data Type | Constraint   | Description                         |
|--------------|----------|-----------|--------------|-------------------------------------|
| event_id     | PK, FK   | INTEGER   | FK (event)   | Event ID                            |
| user_id      | PK, FK   | INTEGER   | FK (user)    | User ID                             |
| createdAt    |          | TIMESTAMP | DF (NOW)     | Creation timestamp                  |
| updatedAt    |          | TIMESTAMP |              | Last update timestamp               |

## Table: event_on_sport
| Field        | Required | Data Type | Constraint   | Description                         |
|--------------|----------|-----------|--------------|-------------------------------------|
| event_id     | PK, FK   | INTEGER   | FK (event)   | Event ID                            |
| sport_id     | PK, FK   | INTEGER   | FK (sport)   | Sport ID                            |
| createdAt    |          | TIMESTAMP | DF (NOW)     | Creation timestamp                  |
| updatedAt    |          | TIMESTAMP |              | Last update timestamp               |

## Table: user_on_sport
| Field        | Required | Data Type | Constraint   | Description                         |
|--------------|----------|-----------|--------------|-------------------------------------|
| user_id      | PK, FK   | INTEGER   | FK (user)    | User ID                             |
| sport_id     | PK, FK   | INTEGER   | FK (sport)   | Sport ID                            |
| createdAt    |          | TIMESTAMP | DF (NOW)     | Creation timestamp                  |
| updatedAt    |          | TIMESTAMP |              | Last update timestamp               |

## Table: sport_on_image
| Field        | Required | Data Type | Constraint   | Description                         |
|--------------|----------|-----------|--------------|-------------------------------------|
| sport_id     | PK, FK   | INTEGER   | FK (sport)   | Sport ID                            |
| image_id     | PK, FK   | INTEGER   | FK (image)   | Image ID                            |
| createdAt    |          | TIMESTAMP | DF (NOW)     | Creation timestamp                  |
| updatedAt    |          | TIMESTAMP |              | Last update timestamp               |
