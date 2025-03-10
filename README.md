# n8n-google-search

An n8n node for Google Search that directly uses the Google Custom Search API without Python dependencies.

## Features

- Web search using Google Custom Search API
- Support for image search
- Minimal dependencies (only axios for HTTP requests)
- Daily query counter with automatic reset
- Fully integrated with n8n

## Installation

### Prerequisites

- Node.js 14+
- n8n installation
- Google Cloud API Key
- Google Custom Search Engine ID (CX)

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/ziobuddalabs/n8n-google-search.git

# Install in n8n (from n8n installation directory)
npm install /path/to/n8n-google-search/n8n-nodes-googlesearch-js
```

Or using the prebuilt package:

```bash
# Install in n8n
npm install /path/to/n8n-google-search/n8n-nodes-googlesearch-js/n8n-nodes-googlesearch-0.2.4.tgz
```

## Configuration

### Step 1: Get Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Enable "Custom Search JSON API"
4. Go to "Credentials" and create a new API Key

### Step 2: Create a Custom Search Engine

1. Go to [Google Programmable Search](https://programmablesearchengine.google.com/)
2. Create a new search engine
3. Configure the settings (sites to search, etc.)
4. Copy the Search Engine ID (cx)

> **Important**: See `CX_GUIDE.md` for detailed instructions on how to create and configure the Google Custom Search Engine.

### Step 3: Configure Credentials in n8n

1. In n8n, go to Settings > Credentials
2. Create a new credential of type "Google Search API"
3. Enter your API Key and Custom Search Engine ID (CX)

## Usage

1. Add the "Google Search" node to your workflow
2. Select the Google Search API credentials
3. Configure the search:
   - Operation: Web Search or Image Search
   - Query: the text to search for
   - Limit: number of results (max 10)
   - Options: Safe Search, Site Search, Language

## Troubleshooting

If you encounter errors, check the `TROUBLESHOOTING.md` file for solutions to common problems.

## Limitations

- Google Custom Search API is limited to 100 free queries per day
- Each request can return a maximum of 10 results

## Additional Features

- **Daily Query Counter**: The node keeps track of how many searches you've performed today, displayed in the node subtitle (resets at midnight)
- **Version and Author Info**: Version and author information is shown in the node description footer

## Changelog

See the `CHANGELOG.md` file for version history and changes.

## License

Mozilla Public License 2.0

---

# n8n-google-search (Italiano)

Un nodo n8n per la ricerca Google che utilizza direttamente l'API Google Custom Search senza dipendenze da Python.

## Caratteristiche

- Ricerca sul web utilizzando l'API Google Custom Search
- Supporto per la ricerca di immagini
- Dipendenze minime (solo axios per le richieste HTTP)
- Contatore di query giornaliere con reset automatico
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
npm install /percorso/a/n8n-google-search/n8n-nodes-googlesearch-js/n8n-nodes-googlesearch-0.2.4.tgz
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

## Funzionalità aggiuntive

- **Contatore di query giornaliere**: Il nodo tiene traccia di quante ricerche hai effettuato oggi, mostrate nel sottotitolo del nodo (si resetta a mezzanotte)
- **Informazioni su versione e autore**: Le informazioni su versione e autore sono mostrate nel footer della descrizione del nodo

## Changelog

Vedi il file `CHANGELOG.md` per la cronologia delle versioni e le modifiche.

## Licenza

Mozilla Public License 2.0