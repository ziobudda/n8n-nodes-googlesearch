# Changelog

## 0.2.4 (2025-03-09)

### Miglioramenti
- Spostato l'informazione di versione e autore nel footer della sezione invece che tra i parametri
- Migliorata l'interfaccia utente rimuovendo elementi non necessari dalla sezione principale

## 0.2.3 (2025-03-09)

### Correzioni
- Integrato il contatore di query direttamente nel file del nodo invece che come modulo separato
- Rimosso il riferimento al modulo esterno QueryCounter
- Implementazione completamente in-memory del contatore

## 0.2.2 (2025-03-09)

### Correzioni
- Rimosso il riferimento dinamico a package.json che causava errori
- Versione hardcoded nel nodo per evitare problemi di caricamento
- Migliorata la resilienza del nodo in ambienti diversi

## 0.2.1 (2025-03-09)

### Correzioni
- Corretto errore del modulo QueryCounter non trovato, aggiungendo la cartella lib al pacchetto npm
- Aggiunto file QueryCounter nella distribuzione npm

## 0.2.0 (2025-03-09)

### Nuova funzionalità
- Aggiunto contatore giornaliero delle query all'API Google Search
- Visualizzazione del contatore nell'interfaccia del nodo (XX/100)
- Visualizzazione della versione e dell'autore (Michel Morelli) nell'interfaccia del nodo
- Salvataggio dell'utilizzo giornaliero in un file esterno che si resetta ogni giorno

## 0.1.6 (2025-03-09)

### Miglioramenti
- Corretto il percorso specifico per le icone richiesto dall'installazione su server
- Aggiunta struttura di cartelle nidificata per supportare il percorso specifico di n8n
- Aggiunto supporto per path complessi come quelli usati nel server

## 0.1.5 (2025-03-09)

### Miglioramenti
- Sistemato definitivamente il problema delle icone
- Aggiunta copia dell'icona nella root del progetto
- Modificato script gulp per copiare l'icona in più posizioni

## 0.1.4 (2025-03-09)

### Miglioramenti
- Ulteriore correzione per la visualizzazione delle icone
- Modificato il percorso di riferimento delle icone

## 0.1.3 (2025-03-09)

### Miglioramenti
- Aggiunta guida dettagliata CX_GUIDE.md per aiutare gli utenti a configurare correttamente il motore di ricerca personalizzato Google
- Migliorata la documentazione relativa al parametro CX (Custom Search Engine ID)

## 0.1.2 (2025-03-09)

### Miglioramenti
- Corretto il percorso delle icone per risolvere il problema di visualizzazione
- Modificato il sistema di copia delle icone nel gulpfile

## 0.1.1 (2025-03-09)

### Miglioramenti
- Migliorata la gestione degli errori per l'API Google Search
- Aggiunto logging dettagliato per la risoluzione dei problemi
- Validazione della query di ricerca prima dell'invio all'API
- Risposta più informativa in caso di errore dell'API
- Creato file TROUBLESHOOTING.md con guide per la risoluzione problemi comuni

## 0.1.0 (2025-03-09)

### Prima release
- Implementazione iniziale del nodo n8n per Google Search API
- Supporto per ricerca web e immagini
- Integrazione con credenziali API Google Custom Search
- Opzioni per Safe Search, ricerca in siti specifici e filtro per lingua