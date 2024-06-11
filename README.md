# Cercle Vertueux
**Autore: Lara Bernasconi**  
SUPSI 2023-234  
Corso d’interaction design, CV427.01  
Docenti: A. Gysin, G. Profeta  

## Introduzione e tema
Cercle Vertueux è un archivio digitale che ospita una collezione di 100 parole intraducibili provenienti da 41 lingue diverse in tutto il mondo. Queste parole catturano significati profondi, sfumature culturali ed emozioni che non possono essere tradotte direttamente in altre lingue. Attraverso questo archivio, invito gli utenti a esplorare la ricchezza e la profondità dell'espressione umana, scoprendo la complessità della diversità linguistica e celebrando il legame tra lingua, cultura ed esperienza umana.

## Riferimenti progettuali
Il principale riferimento progettuale di Cercle Vertueux è il concetto di archivio digitale interattivo. Mi sono ispirata ad altre piattaforme che valorizzano la diversità linguistica e culturale, come il progetto[ "The Dictionary of Obscure Sorrows"](https://www.dictionaryofobscuresorrows.com/), che raccoglie parole inventate per descrivere emozioni complesse. Ho voluto creare un'esperienza utente coinvolgente che permetta di scoprire parole intraducibili in un modo visivamente attraente e interattivo.

## Design dell’interfaccia e modalità di interazione

L'interfaccia di Cercle Vertueux è progettata per essere intuitiva e coinvolgente. Al centro della schermata, le parole sono disposte lungo un cerchio immaginario, che ruota in base all'interazione dell'utente con un cursore. Gli utenti possono utilizzare un cursore a scorrimento per ruotare il cerchio e visualizzare le parole disposte lungo di esso. Cliccando su una parola, si apre una finestra pop-up che fornisce ulteriori dettagli sulla parola scelta, inclusa la lingua di origine e il significato.

### Slider di Rotazione

Il cursore a scorrimento, o slider, permette agli utenti di controllare la rotazione del cerchio di parole. Questo è gestito tramite un semplice elemento `<input>` di tipo `range`, che viene collegato a un event listener in JavaScript per aggiornare l'angolo di rotazione in tempo reale.

#### HTML per lo Slider

```html
<div class="slider-container">
    <input type="range" id="rotationSlider" min="0" max="360" value="0">
</div>
```

#### JavaScript per Gestire lo Slider

Quando l'utente interagisce con lo slider, l'evento `input` viene ascoltato e la funzione di callback aggiorna `rotationAngle` in base al valore corrente dello slider. La funzione `renderWords` viene poi chiamata per ridisporre le parole secondo il nuovo angolo di rotazione.

```javascript
document.getElementById('rotationSlider').addEventListener('input', function(event) {
    rotationAngle = (event.target.value * Math.PI) / 180;
    renderWords();
});
```

### Overlay dei Dettagli

Cliccando su una parola, si apre una finestra pop-up (overlay) che fornisce dettagli aggiuntivi sulla parola scelta. Questo overlay è progettato per apparire sopra il contenuto principale e fornire informazioni come la parola, la lingua di origine e il significato.

#### HTML per l'Overlay

L'overlay include un contenitore centrale con il testo e un pulsante per chiudere l'overlay.

```html
<div id="overlay" class="overlay">
    <div class="overlay-content">
        <span class="close-btn" onclick="closeOverlay()">&times;</span>
        <h2 id="word"></h2>
        <p id="language"></p>
        <p id="meaning"></p>
    </div>
</div>
```

#### CSS per l'Overlay

Il CSS definisce lo stile per l'overlay, rendendolo centrato e visibile sopra il resto del contenuto quando viene attivato.

```css
/* overlay.css */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: none;
    justify-content: center;
    align-items: center;
}

.overlay-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
}
```

#### JavaScript per Gestire l'Overlay

Le funzioni `openOverlay` e `closeOverlay` gestiscono l'apertura e la chiusura dell'overlay. Quando una parola viene cliccata, `openOverlay` aggiorna il contenuto dell'overlay con i dettagli della parola e lo rende visibile. `closeOverlay` nasconde l'overlay quando il pulsante di chiusura viene cliccato.

```javascript
function openOverlay(word, language, meaning) {
    document.getElementById('word').innerText = word;
    document.getElementById('language').innerText = language;
    document.getElementById('meaning').innerText = meaning;
    document.getElementById('overlay').style.display = 'block';
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}
```

### Integrazione delle Funzionalità

Quando i dati delle parole vengono caricati e le parole sono disposte sullo schermo, ogni parola è associata all'evento `onclick` che chiama `openOverlay` con i dettagli della

parola. Questo consente all'utente di cliccare su una parola e vedere immediatamente le informazioni dettagliate in un overlay.


## Tecnologia usata
Per sviluppare Cercle Vertueux, ho utilizzato diverse tecnologie. La struttura HTML definisce la struttura base della pagina web, mentre CSS è utilizzato per lo stile e la presentazione visiva. Il cuore dell'interattività è gestito tramite JavaScript, con l'uso della libreria p5.js per facilitare la visualizzazione delle parole disposte in cerchio e la loro rotazione. L'uso di fetch API permette di caricare i dati delle parole da un file JSON esterno, rendendo l'archivio facilmente aggiornabile e manutenibile.

### Funzione renderWords

La funzione `renderWords` è fondamentale per la visualizzazione dinamica delle parole in un cerchio sullo schermo. Essa utilizza JavaScript per calcolare le posizioni delle parole in base alla dimensione della finestra del browser e le visualizza in una disposizione circolare. Ecco come funziona passo dopo passo.

Innanzitutto, la funzione inizia con la definizione di alcune variabili chiave. `output` è una stringa vuota che verrà utilizzata per accumulare l'HTML generato per ciascuna parola. La variabile `total` memorizza il numero totale di parole da visualizzare, che viene calcolato come la lunghezza dell'array `data`. `centerX` e `centerY` rappresentano rispettivamente le coordinate orizzontali e verticali del centro della finestra del browser, calcolate come metà della larghezza e dell'altezza della finestra. Il raggio del cerchio, rappresentato da `radius`, è determinato come il 35% della dimensione minima tra la larghezza e l'altezza della finestra, assicurando che il cerchio si adatti comodamente allo spazio disponibile.

L'angolo incrementale, `angleIncrement`, è calcolato dividendo l'intero cerchio (2π radianti) per il numero totale di parole. Questo determina la spaziatura angolare uniforme tra le parole.

La funzione quindi entra in un ciclo `for` che itera su ciascuna parola nell'array `data`. Per ogni iterazione, l'angolo corrente, `angle`, è calcolato moltiplicando l'indice corrente `i` per `angleIncrement` e aggiungendo `rotationAngle`, che consente l'animazione della rotazione. Le coordinate `x` e `y` per la posizione di ciascuna parola sono calcolate usando le funzioni `Math.cos` e `Math.sin` per determinare la posizione lungo il cerchio basata sull'angolo.

La stringa HTML per ogni parola è quindi costruita e aggiunta a `output`. Ogni parola è avvolta in un elemento `<a>` con uno stile CSS inline che posiziona l'elemento assolutamente alle coordinate calcolate. La funzione JavaScript `openOverlay` è associata all'evento `onclick` di ciascun elemento `<a>`, passando i dettagli della parola come parametri per visualizzarli in un overlay. La trasformazione CSS `translate(-50%, -50%)` centra esattamente l'elemento rispetto alle coordinate calcolate, e `rotate(${angle}rad)` ruota il testo in modo che sia orientato correttamente lungo il cerchio.

Dopo il ciclo, il contenuto HTML accumulato in `output` viene inserito nell'elemento `<main>` della pagina utilizzando `innerHTML`. Questo aggiorna dinamicamente la pagina con la nuova disposizione delle parole ogni volta che la funzione viene chiamata. La funzione `renderWords` è così progettata per essere chiamata sia durante il caricamento iniziale dei dati che ogni volta che la finestra del browser viene ridimensionata o l'angolo di rotazione viene modificato tramite un controllo dell'utente, garantendo una visualizzazione interattiva e reattiva delle parole.

```
function renderWords() {
    let output = '';
    const total = data.length;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.35;
    const angleIncrement = (2 * Math.PI) / total;

    for (let i = 0; i < total; i++) {
        let angle = i * angleIncrement + rotationAngle;
        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);

        output += `<a href="javascript:void(0);" onclick="openOverlay('${data[i].word}', '${data[i].language}', '${data[i].meaning}')" 
        style="position: absolute; left: ${x}px; top: ${y}px; transform: translate(-50%, -50%) rotate(${angle}rad);"
        class="rotated-text">${data[i].word}</a>`;
    }

    document.querySelector('main').innerHTML = output;
}

```


## Target e contesto d’uso
Cercle Vertueux è rivolto a chiunque sia interessato alla linguistica, alla cultura e all'esplorazione delle diverse forme di espressione umana. Questo include studenti, ricercatori, appassionati di lingue e chiunque sia curioso di scoprire nuovi concetti ed emozioni che non trovano un equivalente diretto in altre lingue. Il contesto d'uso principale è un ambiente educativo o culturale, dove gli utenti possono interagire con l'archivio digitale sia per scopi di apprendimento che di esplorazione personale.