// =================================================================
  // REALISTISCHE ZUGDATEN (JSON-ähnliche Struktur)
  // =================================================================
  /**
   * Array von Zugdaten-Objekten, die verschiedene Züge mit ihren Eigenschaften beschreiben
   * Jedes Objekt enthält:
   * - name: Zugname/Nummer
   * - triebfahrzeuge: Array von Triebfahrzeugtypen
   * - steuerwagen: Boolean, ob ein Steuerwagen vorhanden ist
   * - waggons: Array von Waggontypen
   * - abteile: 2D-Array mit Abteilnummern für Personenwagen
   * - route: Array von Bahnhofsnamen für die Route
   */
  const zugdaten = [
    {
      name: "RE1",
      triebfahrzeuge: ["ELok"],
      steuerwagen: true,
      waggons: ["Personenwagen", "Personenwagen", "Personenwagen"],
      abteile: [[1, 2], [3, 4], [5, 6]],
      route: ["Hamm", "Dortmund", "Essen", "Düsseldorf", "Köln", "Aachen"]
    },
    {
      name: "ICE 1001",
      triebfahrzeuge: ["ELok"],
      steuerwagen: true,
      waggons: [
        "Personenwagen",
        "Personenwagen",
        "Speisewagen",
        "Personenwagen",
        "Personenwagen",
        "Personenwagen"
      ],
      abteile: [[1, 2], [3, 4], [], [5, 6], [7, 8], [9, 10]],
      route: [
        "Hamburg Hbf", "Hannover Hbf", "Göttingen", "Kassel-Wilhelmshöhe",
        "Fulda", "Würzburg Hbf", "Nürnberg Hbf", "Ingolstadt Hbf", "München Hbf"
      ]
    },
    {
      name: "S1",
      triebfahrzeuge: ["ELok", "ELok"],
      steuerwagen: false,
      waggons: ["Personenwagen", "Personenwagen"],
      abteile: [[1], [2]],
      route: ["Dortmund", "Bochum", "Essen", "Duisburg", "Düsseldorf", "Solingen"]
    },
    {
      name: "Güter 501",
      triebfahrzeuge: ["DieselLok"],
      steuerwagen: false,
      waggons: ["Gitterwaggon", "Gitterwaggon", "Gitterwaggon"],
      abteile: [[], [], []],
      route: ["Hamburg Hafen", "Hannover", "Kassel", "Frankfurt"]
    }
  ];

  // =================================================================
  // OOP-KLASSENMODELL
  // =================================================================

  /**
   * Klasse Bahnhof - Repräsentiert einen Bahnhof
   * @constructor
   * @param {string} name - Name des Bahnhofs
   */
  class Bahnhof {
    constructor(name) {
      this.name = name;
    }
  }

  /**
   * Klasse Abteil - Repräsentiert ein Abteil in einem Personenwagen
   * @constructor
   * @param {number} nummer - Nummer des Abteils
   */
  class Abteil {
    constructor(nummer) {
      this.nummer = nummer;
    }
  }

  /**
   * Basisklasse Waggon - Repräsentiert einen generischen Waggon
   * @constructor
   * @param {string} typ - Typ des Waggons
   */
  class Waggon {
    constructor(typ) {
      this.typ = typ;
    }
  }

  /**
   * Klasse Personenwagen - Spezialisierter Waggon für Passagiere
   * Erbt von Waggon
   * @extends Waggon
   */
  class Personenwagen extends Waggon {
    constructor() {
      super("Personenwagen");
      this.abteile = []; // Array für Abteile in diesem Waggon
    }

    /**
     * Fügt ein Abteil zum Waggon hinzu
     * @param {Abteil} abteil - Abteil-Objekt das hinzugefügt wird
     */
    abteilHinzufuegen(abteil) {
      this.abteile.push(abteil);
    }
  }

  /**
   * Klasse Speisewagen - Spezialisierter Waggon für Verpflegung
   * Erbt von Waggon
   * @extends Waggon
   */
  class Speisewagen extends Waggon {
    constructor() {
      super("Speisewagen");
    }
  }

  /**
   * Klasse Gitterwaggon - Spezialisierter Waggon für Gütertransport
   * Erbt von Waggon
   * @extends Waggon
   */
  class Gitterwaggon extends Waggon {
    constructor() {
      super("Gitterwaggon");
    }
  }

  /**
   * Basisklasse Triebfahrzeug - Repräsentiert ein generisches Triebfahrzeug
   * @constructor
   * @param {string} typ - Typ des Triebfahrzeugs
   */
  class Triebfahrzeug {
    constructor(typ) {
      this.typ = typ;
    }
  }

  /**
   * Klasse DieselLok - Spezialisiertes Triebfahrzeug mit Dieselantrieb
   * Erbt von Triebfahrzeug
   * @extends Triebfahrzeug
   */
  class DieselLok extends Triebfahrzeug {
    constructor() {
      super("Diesel-Lok");
    }
  }

  /**
   * Klasse ELok - Spezialisiertes Triebfahrzeug mit Elektroantrieb
   * Erbt von Triebfahrzeug
   * @extends Triebfahrzeug
   */
  class ELok extends Triebfahrzeug {
    constructor() {
      super("E-Lok");
    }
  }

  /**
   * Klasse Zug - Repräsentiert einen kompletten Zug mit Waggons und Triebfahrzeugen
   * @constructor
   * @param {string} name - Name/Nummer des Zuges
   * @param {Array<Triebfahrzeug>} triebfahrzeuge - Array von Triebfahrzeugen
   * @param {boolean} steuerwagen - Ob der Zug einen Steuerwagen hat
   */
  class Zug {
    constructor(name, triebfahrzeuge, steuerwagen) {
      this.name = name;
      this.triebfahrzeuge = triebfahrzeuge; // Array von Triebfahrzeugen
      this.steuerwagen = steuerwagen;       // Boolean für Steuerwagen
      this.waggons = [];                    // Array für Waggons
    }

    /**
     * Fügt einen Waggon zum Zug hinzu
     * @param {Waggon} waggon - Waggon-Objekt das hinzugefügt wird
     */
    waggonHinzufuegen(waggon) {
      this.waggons.push(waggon);
    }
  }

  /**
   * Klasse Fahrt - Repräsentiert eine Zugfahrt mit Route
   * @constructor
   * @param {Zug} zug - Zug-Objekt für diese Fahrt
   * @param {Array<Bahnhof>} bahnhoefe - Array von Bahnhöfen der Route
   * @throws {Error} Wenn weniger als 2 Bahnhöfe angegeben werden
   */
  class Fahrt {
    constructor(zug, bahnhoefe) {
      if (bahnhoefe.length < 2) {
        throw new Error("Eine Fahrt muss mindestens zwei Bahnhöfe enthalten.");
      }
      this.zug = zug;
      this.bahnhoefe = bahnhoefe;
    }
  }

  /**
   * Klasse Fahrplan - Verwaltet eine Sammlung von Fahrten
   * @constructor
   */
  class Fahrplan {
    constructor() {
      this.fahrten = []; // Array für gespeicherte Fahrten
    }

    /**
     * Fügt eine Fahrt zum Fahrplan hinzu
     * @param {Fahrt} fahrt - Fahrt-Objekt das hinzugefügt wird
     */
    fahrtHinzufuegen(fahrt) {
      this.fahrten.push(fahrt);
    }

    /**
     * Zeigt den Fahrplan im angegebenen HTML-Element an
     * @param {HTMLElement} htmlElement - DOM-Element für die Ausgabe
     */
    anzeigen(htmlElement) {
      // Überprüfen ob Fahrten vorhanden sind
      if (this.fahrten.length === 0) {
        htmlElement.innerHTML = "<p>Keine Fahrten im Fahrplan.</p>";
        return;
      }

      // Für jede Fahrt im Fahrplan...
      this.fahrten.forEach(fahrt => {
        // Erstelle ein Div-Element für den Zug
        const zugDiv = document.createElement("div");
        zugDiv.className = "zug";

        // Erstelle Zug-Info-Überschrift mit Name und Triebfahrzeugen
        const triebText = fahrt.zug.triebfahrzeuge.map(tfz => tfz.typ).join(" + ");
        const zugInfo = document.createElement("h2");
        zugInfo.textContent = `${fahrt.zug.name} [${triebText}${fahrt.zug.steuerwagen ? " + Steuerwagen" : ""}]`;
        zugDiv.appendChild(zugInfo);

        // Erstelle Route-Information
        const route = document.createElement("div");
        route.className = "bahnhof";
        route.textContent = "Route: " + fahrt.bahnhoefe.map(b => b.name).join(" ➝ ");
        zugDiv.appendChild(route);

        // Erstelle Waggon-Liste
        const waggonList = document.createElement("div");
        waggonList.className = "waggons";
        waggonList.textContent = "Waggons: " + fahrt.zug.waggons.map(w => w.typ).join(", ");
        zugDiv.appendChild(waggonList);

        // Für jeden Waggon Abteil-Informationen hinzufügen (falls vorhanden)
        fahrt.zug.waggons.forEach(w => {
          if (w instanceof Personenwagen && w.abteile.length > 0) {
            const abteileDiv = document.createElement("div");
            abteileDiv.className = "abteile";
            abteileDiv.textContent = `Abteile: ` + w.abteile.map(a => a.nummer).join(", ");
            zugDiv.appendChild(abteileDiv);
          }
        });

        // Füge den Zug-Div zum HTML-Element hinzu
        htmlElement.appendChild(zugDiv);
      });
    }
  }

  // =================================================================
  // DATEN LADEN UND OBJEKTE ERZEUGEN
  // =================================================================

  // Erstelle einen neuen Fahrplan
  const fahrplan = new Fahrplan();

  // Verarbeite jede Zugdefinition in den zugdaten
  zugdaten.forEach(daten => {
    // Erstelle Triebfahrzeuge basierend auf den Daten
    const triebfahrzeuge = daten.triebfahrzeuge.map(typ => {
      if (typ === "DieselLok") return new DieselLok();
      if (typ === "ELok") return new ELok();
      return new Triebfahrzeug(typ);
    });

    // Erstelle den Zug mit den Triebfahrzeugen und Steuerwagen-Information
    const zug = new Zug(daten.name, triebfahrzeuge, daten.steuerwagen);

    // Füge Waggons zum Zug hinzu
    daten.waggons.forEach((typ, index) => {
      let waggon;
      if (typ === "Personenwagen") {
        waggon = new Personenwagen();
        // Füge Abteile zum Personenwagen hinzu
        daten.abteile[index].forEach(nr => waggon.abteilHinzufuegen(new Abteil(nr)));
      } else if (typ === "Speisewagen") {
        waggon = new Speisewagen();
      } else {
        waggon = new Gitterwaggon();
      }
      zug.waggonHinzufuegen(waggon);
    });

    // Erstelle Bahnhofs-Objekte für die Route
    const bahnhoefe = daten.route.map(name => new Bahnhof(name));
    
    // Erstelle eine Fahrt mit dem Zug und der Route
    const fahrt = new Fahrt(zug, bahnhoefe);
    
    // Füge die Fahrt zum Fahrplan hinzu
    fahrplan.fahrtHinzufuegen(fahrt);
  });

  // Zeige den Fahrplan im HTML-Element mit der ID "fahrplan" an
  const anzeige = document.getElementById("fahrplan");
  fahrplan.anzeigen(anzeige);

// =================================================================
// KLASSENBEZIEHUNGEN UND OBJEKTZUSAMMENSETZUNG
// =================================================================

// VERERBUNGSBEZIEHUNGEN (Generalisierung/Spezialisierung):
// --------------------------------------------------------
// - Personenwagen erbt von Waggon
// - Speisewagen erbt von Waggon
// - Gitterwaggon erbt von Waggon
// - DieselLok erbt von Triebfahrzeug
// - ELok erbt von Triebfahrzeug
//
// Jede dieser Spezialisierungen erweitert die Basisklasse mit spezifischen
// Eigenschaften oder Verhalten, bleibt aber kompatibel mit der Oberklasse.

// KOMPOSITIONSBEZIEHUNGEN (Teil-Ganzes-Beziehungen):
// ---------------------------------------------------
// - Ein Zug KOMPONIERT sich aus:
//   * 1..n Triebfahrzeugen (aggregiert in this.triebfahrzeuge)
//   * 0..1 Steuerwagen (als boolean-Flag)
//   * 0..n Waggons (aggregiert in this.waggons)
//
// - Ein Personenwagen KOMPONIERT sich aus:
//   * 0..n Abteilen (aggregiert in this.abteile)
//
// - Eine Fahrt KOMPONIERT sich aus:
//   * 1 Zug (Referenz auf Zug-Objekt)
//   * 2..n Bahnhöfen (aggregiert in this.bahnhoefe)
//
// - Ein Fahrplan KOMPONIERT sich aus:
//   * 0..n Fahrten (aggregiert in this.fahrten)

// ASSOZIATIONEN:
// --------------
// - Bahnhof ist assoziiert mit Fahrt über die Route
// - Abteil ist assoziiert mit Personenwagen
// - Waggon ist assoziiert mit Zug
// - Triebfahrzeug ist assoziiert mit Zug

// ABHÄNGIGKEITEN:
// ---------------
// - Die Klasse Fahrt ist abhängig von Zug und Bahnhof
// - Die Klasse Fahrplan ist abhängig von Fahrt
// - Die Klasse Zug ist abhängig von Triebfahrzeug und Waggon
// - Personenwagen ist abhängig von Abteil

// OBJEKT-LEBENSDAUER:
// -------------------
// - Triebfahrzeuge existieren solange wie ihr übergeordneter Zug
// - Waggons existieren solange wie ihr übergeordneter Zug
// - Abteile existieren solange wie ihr übergeordneter Personenwagen
// - Bahnhöfe existieren unabhängig von Fahrten
// - Fahrten existieren solange wie der Fahrplan, der sie enthält
