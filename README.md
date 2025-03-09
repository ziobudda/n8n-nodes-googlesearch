# n8n-google-search

Un nodo n8n per la ricerca Google che utilizza direttamente l'API Google Custom Search senza dipendenze da Python.

## Caratteristiche

- Ricerca sul web utilizzando l'API Google Custom Search
- Supporto per la ricerca di immagini
- Dipendenze minime (solo axios per le richieste HTTP)
- Completamente integrato con n8n

## Installazione

### Prerequisiti

- Node.js 14+
- Installazione n8n
- API Key di Google Cloud
- ID motore di ricerca personalizzato Google (CX)

### Passi per l'installazione

```bash
# Clona la repository
git clone https://github.com/ziobuddalabs/n8n-google-search.git

# Installa in n8n (dalla directory di installazione n8n)
npm install /percorso/a/n8n-google-search/n8n-nodes-googlesearch-js
```

Oppure usando il pacchetto precompilato:

```bash
# Installa in n8n
npm install /percorso/a/n8n-google-search/n8n-nodes-googlesearch-js/n8n-nodes-googlesearch-0.1.3.tgz
```

## Configurazione

### Passo 1: Ottenere API Key Google

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto (o usa uno esistente)
3. Attiva l'API "Custom Search JSON API"
4. Vai su "Credenziali" e crea una nuova API Key

### Passo 2: Creare un motore di ricerca personalizzato

1. Vai su [Google Programmable Search](https://programmablesearchengine.google.com/)
2. Crea un nuovo motore di ricerca
3. Configura le impostazioni (siti da cercare, ecc.)
4. Copia l'ID del motore di ricerca (cx)

> **Importante**: Vedi `CX_GUIDE.md` per istruzioni dettagliate su come creare e configurare il motore di ricerca personalizzato Google.

### Passo 3: Configurare le credenziali in n8n

1. In n8n, vai su Impostazioni > Credenziali
2. Crea una nuova credenziale di tipo "Google Search API"
3. Inserisci la tua API Key e l'ID del motore di ricerca (CX)

## Utilizzo

1. Aggiungi il nodo "Google Search" al tuo workflow
2. Seleziona le credenziali Google Search API
3. Configura la ricerca:
   - Operazione: Web Search o Image Search
   - Query: il testo da cercare
   - Limit: numero di risultati (max 10)
   - Opzioni: Safe Search, ricerca per sito, lingua

## Risoluzione dei problemi

Se incontri errori, consulta il file `TROUBLESHOOTING.md` per le soluzioni ai problemi più comuni.

## Limitazioni

- L'API Google Custom Search è limitata a 100 query gratuite al giorno
- Ogni richiesta può restituire un massimo di 10 risultati

## Changelog

Vedi il file `CHANGELOG.md` per la cronologia delle versioni e le modifiche.

## Licenza

MIT