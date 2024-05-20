import { create } from 'zustand'
import { EmployeeT } from 'types/Employee'
import { createStore } from 'utils/createStore'

// Step 1: Define the expected shape of the store's data.
// Do not include actions in the store type.

export type EmployeesStoreT = {
  employees: EmployeeT[] | T.Absent
}

// Step 2: Create the store. Only describe its data here,
// but not any logic. Logic should be defined in actions below.

const [useEmployeesStore, createAction] = createStore<EmployeesStoreT>({
  employees: [],
})

// Step 3: Define actions. Each action needs to supply createAction with
// the type for the data it expects to receive upon invocation.

export const setEmployees = createAction<EmployeeT[]>((state, employees) => {
  return { employees }
})

// export const useEmployeesStore = create<EmployeesStoreT>(() => {
//   // Any computations to generate the initial state
//   // should be done here, rather than in the shared
//   // module scope.

//   return {
//     employees: [] as EmployeeT[],
//   };
// });

type ActionHandlerT = <InputT>(state: EmployeesStoreT, input: InputT) => EmployeesStoreT

const action = <InputT>(handler: ActionHandlerT) => {
  return (options: InputT) => {
    const store = useEmployeesStore
    store.setState((state) => handler(state, options))
  }
}

export const updateEmployees = action<EmployeeT[]>((state, data) => {
  return { ...state, employees: data as EmployeeT[] }
})

export const clearEmployees = action((state) => {
  return { ...state, employees: [] }
})

export const useClassesStore = create((set) => {
  const setClasses = (classes: T.AnyObject[]) => {
    set({ classes })
  }

  return {
    classes: [],
    setClasses,
  }
})
