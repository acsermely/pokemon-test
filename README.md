# Pokemon game

This repo contains a webapp where users can pick their favouite pokemons.

## Run
To start both the backend and frontned run the following script:
``` sh
> npn run all
```

## Details
Some technical details about the project:
### Backend
|||
| ------ | --------|
| Server | Express |
| DB     | SQLite  |

#### DB
##### pokemon table
| Name | Type |
| ------ | --------|
| id        | int (PK)    |
| name      | text        |
| img       | text (url)  |
| height    | int         |
| abilities | text (list) |

##### votes table
| Name | Type |
| ------ | --------|
| pokemon_id | int (PK,FK) |
| vote_count | int (def 0) |


### Frontend
|||
| --------- | ----------|
| Framework  | SvelteKit |
| Styling    | Tailwind  |
| Components | DaisyUI   |