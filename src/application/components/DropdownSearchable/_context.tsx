import { Context, createContext, useContext, useEffect, useState } from "react";

export type Option<T> = { label: string; value: T };

export type DropdownSearchableContextType<T> = {
  readonly options: Option<T>[];

  readonly search: string;
  readonly change_search: (search: string) => void;

  readonly modalIsVisible: boolean;
  readonly show_modal: () => void;
  readonly dismiss_modal: () => void;

  readonly selected: Option<T>;
  readonly change_selected: (search: Option<T>) => void

  readonly context: Context<DropdownSearchableContextType<T> | undefined>
}

interface DropdownSearchableProviderProps<T> {
  children: React.JSX.Element;
}

export interface useModalDropdownSearchableReturn<T> {
  isVisible: boolean;
  show_modal: () => void;
  dismiss_modal: () => void;
}

export interface useSelectedDropdownSearchable<T> {
  selected: Option<T>;
  change_selected: (selected: Option<T>) => void;
}

interface useListDropdownSearchable<T> {
  options: Array<Option<T>>
}

export function createContextDropdownSearchable<T>(
  options: Option<T>[],
  onSelect: (selected: Option<T>) => void,
  initialSelected?: Option<T>,
) {
  const DropdownSearchableContext = createContext<DropdownSearchableContextType<T> | undefined>(undefined)

  function DropdownSearchableProvider({
    children,
  }: DropdownSearchableProviderProps<T>) {
    const [search, setSearch] = useState<string>("")
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const [optionsFiled, setOptionsField] = useState<Array<Option<T>>>(options)
    const [selected, setSelected] = useState<Option<T>>(initialSelected ?? options[0])

    useEffect(() => {
      setOptionsField(() => {
        return options.filter(option => option.label.includes(search))
      })
    }, [search])

    useEffect(() => {
      onSelect(selected)
    }, [selected])

    const change_search = (search: string) => {
      setSearch(search)
    }

    const change_selected = (selected: Option<T>) => {
      setSelected(selected)
    }

    const show_modal = () => {
      setModalIsVisible(true)
    }

    const dismiss_modal = () => {
      setModalIsVisible(false);
      setSearch("");
      setOptionsField(options);
    }

    return (
      <DropdownSearchableContext.Provider
        value={{
          options: optionsFiled,

          search,
          change_search,

          modalIsVisible,
          show_modal,
          dismiss_modal,

          selected,
          change_selected,

          context: DropdownSearchableContext
        }}
        children={children}
      />
    )
  }

  function useModalDropdownSearchable(): useModalDropdownSearchableReturn<T> {
    const context = useContext(DropdownSearchableContext)
    if (context === undefined) {
      throw new Error('useModalDropdownSearchable must be used within a DropdownSearchableProvider');
    }

    const {
      modalIsVisible,
      show_modal,
      dismiss_modal
    } = context

    return {
      isVisible: modalIsVisible,
      show_modal,
      dismiss_modal
    }
  }

  function useSelectedDropdownSearchable(): useSelectedDropdownSearchable<T> {
    const context = useContext(DropdownSearchableContext)
    if (context === undefined) {
      throw new Error('useSelected must be used within a DropdownSearchableProvider');
    }

    const {
      selected,
      change_selected
    } = context

    return {
      selected,
      change_selected
    }
  }

  function useListDropdownSearchable(): useListDropdownSearchable<T> {
    const context = useContext(DropdownSearchableContext)
    if (context === undefined) {
      throw new Error('useListDropdownSearchable must be used within a DropdownSearchableProvider');
    }

    const {
      options
    } = context

    return {
      options
    }
  }

  function useSearchDropdownSearchable() {
    const context = useContext(DropdownSearchableContext)
    if (context === undefined) {
      throw new Error('useSearchDropdownSearchable must be used within a DropdownSearchableProvider');
    }

    const {
      search,
      change_search,
    } = context

    return {
      search,
      change_search,
    }
  }

  function useDropdownSearchableContext() {
    const context = useContext(DropdownSearchableContext)
    if (context === undefined) {
      throw new Error('useDropdownSearchableContext must be used within a DropdownSearchableProvider');
    }
    return context
  }

  return {
    DropdownSearchableProvider,
    DropdownSearchableContext,
    useModalDropdownSearchable,
    useSelectedDropdownSearchable,
    useListDropdownSearchable,
    useDropdownSearchableContext,
    useSearchDropdownSearchable
  }
}