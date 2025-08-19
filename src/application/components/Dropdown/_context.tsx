import { Context, createContext, useContext, useRef, useState } from "react";

export type Option<T> = { label: string; value: T };

export type DropdownContextType<T> = {
  readonly options: Array<Option<T>>;

  readonly modalIsVisible: boolean;
  readonly show_modal: () => void;
  readonly dismiss_modal: () => void;

  readonly selected: Option<T>;
  readonly change_selected: (selected: Option<T>) => void

  readonly context: Context<DropdownContextType<T> | undefined>
}

interface DropdownProviderProps<T> {
  children: React.JSX.Element;
}

export interface useModalDropdownReturn<T> {
  isVisible: boolean;
  show_modal: () => void;
  dismiss_modal: () => void;
}

export interface useSelectedDropdown<T> {
  selected: Option<T>;
  change_selected: (selected: Option<T>) => void;
}

interface useListDropdown<T> {
  options: Array<Option<T>>
}

// ALERT: Não existe no _context do Searchable
export interface DropdownTypeRef<T> {
  selected: React.MutableRefObject<T>;
  changeSelected: (option: T) => void;
}

// ALERT: Não existe no _context do Searchable
export function useRefDropdown<T>(initialSelected: T): DropdownTypeRef<T> {
  const ref = useRef<T>(initialSelected);
  const changeSelected = (selected: T) => ref.current = selected;
  return {
    selected: ref,
    changeSelected,
  };
}

export function createContextDropdown<T>(
  options: Option<T>[],
  onSelect: (selected: Option<T>) => void,
  initialSelected?: Option<T>,
) {
  const DropdownContext = createContext<DropdownContextType<T> | undefined>(undefined)

  function DropdownProvider({
    children,
  }: DropdownProviderProps<T>) {
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const [optionsFiled, setOptionsField] = useState<Array<Option<T>>>(options)
    const [selected, setSelected] = useState<Option<T>>(initialSelected ?? options[0])

    const change_selected = (selected: Option<T>) => {
      setSelected(selected)
      onSelect(selected)
    }

    const show_modal = () => {
      setModalIsVisible(true)
    }

    const dismiss_modal = () => {
      setModalIsVisible(false);
      setOptionsField(options);
    }

    return (
      <DropdownContext.Provider
        value={{
          options: optionsFiled,

          modalIsVisible,
          show_modal,
          dismiss_modal,

          selected,
          change_selected,

          context: DropdownContext
        }}
        children={children}
      />
    )
  }

  function useModalDropdown(): useModalDropdownReturn<T> {
    const context = useContext(DropdownContext)
    if (context === undefined) {
      throw new Error('useModalDropdown must be used within a DropdownProvider');
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

  function useSelectedDropdown(): useSelectedDropdown<T> {
    const context = useContext(DropdownContext)
    if (context === undefined) {
      throw new Error('useSelected must be used within a DropdownProvider');
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

  function useListDropdown(): useListDropdown<T> {
    const context = useContext(DropdownContext)
    if (context === undefined) {
      throw new Error('useListDropdown must be used within a DropdownProvider');
    }

    const {
      options
    } = context

    return {
      options
    }
  }

  function useDropdownContext() {
    const context = useContext(DropdownContext)
    if (context === undefined) {
      throw new Error('useDropdownContext must be used within a DropdownProvider');
    }
    return context
  }

  return {
    DropdownProvider,
    DropdownContext,
    useModalDropdown,
    useSelectedDropdown,
    useListDropdown,
    useDropdownContext
  }
}