# Conversa sobre TypeScript: Tipo `PartialOnly` e Ação Rápida no VSCode

> Este é um resumo de uma pesquisa feita no [Deepseek](https://chat.deepseek.com/). Onde eu queria entender o porquê da minha solução de deixar apenas alguns atributos especificados de uma interface como opcional. Você pode encontrar a transcrição da conversa no [link](chat-PartialOnly-Deepseek_transcription.html)

## Pergunta Inicial

```typescript
type PartialOnly<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
```

No VSCode não aparece a ação rápida de "adicionar propriedade faltantes".

---

## Resposta 1: Análise do Problema

### **Análise do Tipo `PartialOnly`**

Seu tipo está correto para tornar algumas propriedades opcionais (`K`) e manter o resto obrigatório:

```typescript
type PartialOnly<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
```

### **Por que a Ação Rápida Não Aparece?**

O VSCode (e o TypeScript) pode ter dificuldade em inferir propriedades faltantes em tipos complexos como interseções (`&`).  
Isso acontece porque:

1. **Interseções não são "mescladas" automaticamente** pelo TypeScript em um único objeto.  
2. O tipo resultante é tecnicamente uma combinação de dois tipos.

---

## Solução Proposta: Usar `Expand`

### **Definição do Utilitário `Expand`**

```typescript
type Expand<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
```

### **Aplicação em `PartialOnly`**

```typescript
type PartialOnly<T, K extends keyof T> = Expand<Partial<Pick<T, K>> & Omit<T, K>>;
```

### **Por Que Isso Funciona?**

- Força o TypeScript a tratar o tipo como um objeto único (não como interseção).  
- Melhora a compatibilidade com ferramentas do VSCode.

---

## Exemplo Prático

```typescript
interface User {
    id: number;
    name: string;
    age: number;
}

const user: PartialOnly<User, 'id'> = {}; 
// ↑ Mostrará erro e sugerirá "Add missing properties" (name, age)
```

---

## Variações Avançadas

### **Expandir Tipos Aninhados**

```typescript
type ExpandDeep<T> = T extends object 
    ? T extends infer U 
        ? { [K in keyof U]: ExpandDeep<U[K]> } 
        : never 
    : T;
```

---

## Conclusão Final

- `Expand` resolve problemas de interseções em tipos complexos.  
- Torna o código mais legível e compatível com ferramentas.  
- Habilitar ações rápidas como "adicionar propriedades faltantes".
