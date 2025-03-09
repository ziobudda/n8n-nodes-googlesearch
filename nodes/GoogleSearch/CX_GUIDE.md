# Guida alla configurazione del motore di ricerca personalizzato Google (CX)

## Cos'è il parametro CX?

Il parametro CX (Custom Search Engine ID) è l'identificatore univoco del tuo motore di ricerca personalizzato Google. È necessario per utilizzare l'API Google Custom Search.

## Come ottenere un ID motore di ricerca personalizzato (CX)

### Passo 1: Creare un motore di ricerca personalizzato

1. Vai su [Google Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Clicca su "Crea un motore di ricerca"
3. Configura il tuo motore di ricerca:
   - **Nome**: Dai un nome al tuo motore di ricerca
   - **Siti da cercare**: Puoi scegliere "Ricerca nell'intero web" o limitare la ricerca a siti specifici
   - **Lingua**: Scegli la lingua preferita
   - **Ricerca per immagini**: Abilita se vuoi cercare anche immagini

4. Clicca su "Crea"

### Passo 2: Trovare l'ID del motore di ricerca (CX)

1. Dopo aver creato il motore di ricerca, sarai reindirizzato alla dashboard
2. Clicca sul tuo motore di ricerca appena creato
3. Vai alla sezione "Configurazione base"
4. Cerca "ID motore di ricerca" o "Search engine ID"
5. Copia il valore - avrà un formato simile a: `012345678901234567890:abcdefghijk`

### Passo 3: Configurare le credenziali in n8n

1. Vai su Impostazioni > Credenziali in n8n
2. Crea una nuova credenziale di tipo "Google Search API"
3. Inserisci:
   - **API Key**: La tua chiave API di Google Cloud
   - **Custom Search Engine ID**: L'ID CX che hai copiato nel passo precedente
4. Salva le credenziali

## Risoluzione dei problemi CX

Se ricevi un errore "Google Search API error: Request failed with status code 400", verifica:

1. **CX vuoto o non valido**: Assicurati che l'ID del motore di ricerca sia stato inserito correttamente
2. **Formato CX errato**: Il CX dovrebbe avere un formato specifico (es. `012345678901234567890:abcdefghijk`)
3. **Motore di ricerca non attivo**: Assicurati che il tuo motore di ricerca sia attivo nella dashboard di Google Programmable Search

## Configurazione avanzata del motore di ricerca

Per ottimizzare i risultati di ricerca, puoi:

1. **Personalizzare i siti da includere**: Limita la ricerca a domini specifici
2. **Configurare sinonimi**: Migliora i risultati di ricerca con sinonimi personalizzati
3. **Escludere termini**: Filtra i risultati per escludere contenuti indesiderati
4. **Personalizzare l'ordinamento**: Modifica l'ordine predefinito dei risultati

Tutte queste configurazioni possono essere fatte tramite la dashboard di Google Programmable Search Engine.