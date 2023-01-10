import { GET_ALL_POKEMON,
          FILTER_BY_TYPE,
          FILTER_BY_CREATED,
          FILTER_BY_ATTACK,
          ORDER_BY_NAME,
          GET_POKEMON_NAME,
          POST_POKEMON,
          GET_POKEMON_TYPES
          } from '../actions';

const initialState = {
  pokemon:[],
  allPokemon:[],
  detail:[],
  types:[],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
        allPokemon: action.payload
      };
      case GET_POKEMON_NAME:
        return {
          ...state,
          pokemon: action.payload,
        };
      case GET_POKEMON_TYPES:
        return {
          ...state,
          types: action.payload
        }
      case POST_POKEMON:
        return {
          ...state,
        };
      case FILTER_BY_TYPE:
        const allPokemon = state.allPokemon;
        const typeFilter = action.payload === 'type'
          ? allPokemon
          : allPokemon.filter((t) => t.types.includes(action.payload));
            return {
            ...state,
            pokemon: typeFilter
          };
      case FILTER_BY_CREATED:
        const createdFilter = action.payload === 'created'
          ? state.allPokemon.filter(p => p.createdInDb)
          : state.allPokemon.filter(p => !p.createdInDb);
            return {
              ...state,
              pokemon: action.payload === 'all' ? state.allPokemon : createdFilter,
            };
      case FILTER_BY_ATTACK:
        let attackFilter = [...state.pokemon];
        attackFilter = attackFilter.sort((a, b) => {
          if (a.attack < b.attack) {
            return action.payload === 'more aggressive' ? 1 : -1;
          }
          if (a.attack > b.attack) {
            return action.payload === 'more aggressive' ? -1 : 1;
          }
          return 0;
        });
        return {
          ...state,
          pokemon:
            action.payload === 'attack' ? state.allPokemon : attackFilter
        };

      case ORDER_BY_NAME:
        let orderName = [...state.pokemon];
        orderName = orderName.sort((a, b) => {
          if (a.name< b.name) {
            return action.payload === 'asc' ? -1 : 1;
          }
          if (a.name> b.name) {
            return action.payload === 'asc' ? 1 : -1;
          }
          return 0;
        });
        return {
          ...state,
          pokemon:
            action.payload === 'name' ? state.allPokemon : orderName
        };
    default: return {...state};
  }
};