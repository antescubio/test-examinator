# 🎓 Test Examinator - Plan de Desarrollo MVP

## Visión

App web gratuita de preparación de exámenes estilo **autoescuela** para certificaciones oficiales de **Microsoft** y **MuleSoft**. Sin registro, sin backend, multi-idioma (ES/EN).

El usuario selecciona una certificación, realiza un examen simulado con temporizador, y al finalizar ve su puntuación con explicaciones detalladas de cada respuesta.

---

## Decisiones de Diseño

| Decisión | Valor |
|---|---|
| Framework | React + Vite |
| Estilos | Tailwind CSS |
| Routing | React Router v6 |
| i18n | react-i18next |
| Estado | React Context + useReducer |
| Persistencia | LocalStorage (sin backend) |
| Autenticación | No hay (anónimo) |
| Fuente de preguntas | Archivos JSON estáticos en `/src/data/` |
| Despliegue | Preparado para Vercel / GitHub Pages / Netlify |
| Idiomas | Español + Inglés |

---

## Certificaciones del MVP

### Microsoft
- **AZ-900** – Azure Fundamentals
- **AZ-104** – Azure Administrator
- **AZ-204** – Azure Developer Associate
- **AZ-305** – Azure Solutions Architect Expert

### MuleSoft
- **MCD-Level-1** – MuleSoft Certified Developer Level 1
- **MCIA** – MuleSoft Certified Integration Architect

---

## Estructura del Proyecto (objetivo final)

```
test-examinator/
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── assets/                     # Imágenes, logos de certificaciones
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── Exam/
│   │   │   ├── QuestionCard.jsx    # Renderiza una pregunta con sus opciones
│   │   │   ├── Timer.jsx           # Temporizador del examen
│   │   │   ├── ProgressBar.jsx     # Barra de progreso (pregunta X de Y)
│   │   │   ├── OptionButton.jsx    # Botón de opción de respuesta
│   │   │   └── ExamNavigation.jsx  # Navegación entre preguntas (ant/sig)
│   │   └── Results/
│   │       ├── ScoreCard.jsx       # Tarjeta con puntuación final
│   │       ├── QuestionReview.jsx  # Revisión de una pregunta con explicación
│   │       └── ResultsSummary.jsx  # Resumen general del examen
│   ├── pages/
│   │   ├── Home.jsx                # Página principal: selección de certificación
│   │   ├── ExamConfig.jsx          # Configuración pre-examen (nº preguntas, tiempo)
│   │   ├── ExamPage.jsx            # Página del examen simulado en curso
│   │   └── ResultsPage.jsx         # Página de resultados post-examen
│   ├── data/
│   │   ├── certifications.json     # Catálogo de certificaciones disponibles
│   │   └── questions/
│   │       ├── az-900.json         # Preguntas AZ-900
│   │       ├── az-104.json         # Preguntas AZ-104
│   │       ├── az-204.json         # Preguntas AZ-204
│   │       ├── az-305.json         # Preguntas AZ-305
│   │       ├── mcd-level-1.json    # Preguntas MCD Level 1
│   │       └── mcia.json           # Preguntas MCIA
│   ├── context/
│   │   └── ExamContext.jsx         # Context global del examen en curso
│   ├── hooks/
│   │   ├── useExam.js              # Hook para la lógica del examen
│   │   ├── useTimer.js             # Hook para el temporizador
│   │   └── useLocalStorage.js      # Hook para persistencia local
│   ├── i18n/
│   │   ├── i18n.js                 # Configuración de react-i18next
│   │   ├── es.json                 # Traducciones español
│   │   └── en.json                 # Traducciones inglés
│   ├── utils/
│   │   ├── shuffle.js              # Utilidad para barajar preguntas/opciones
│   │   ├── scoring.js              # Cálculo de puntuación
│   │   └── questionParser.js       # Parser/validador del formato de preguntas
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                   # Tailwind base imports
├── scripts/
│   └── scrape-examtopics.md        # Documentación sobre cómo obtener preguntas
├── PLAN.md                         # Este archivo
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

---

## Fases de Implementación

Cada fase es independiente y debe ejecutarse en orden. Cada una produce un commit funcional.

---

### FASE 1: Scaffolding del proyecto ✅

**Objetivo:** Proyecto base funcionando con todas las dependencias instaladas y configuradas.

**Tareas:**
1. Inicializar proyecto con `npm create vite@latest . -- --template react`
2. Instalar dependencias:
   - `tailwindcss @tailwindcss/vite` (Tailwind CSS con plugin de Vite)
   - `react-router-dom` (routing)
   - `react-i18next i18next i18next-browser-languagedetector` (i18n)
3. Configurar Tailwind CSS:
   - Añadir el plugin `@tailwindcss/vite` en `vite.config.js`
   - Importar `tailwindcss` en `src/index.css` con `@import "tailwindcss";`
4. Crear estructura de carpetas vacía (`components/`, `pages/`, `data/`, `hooks/`, `i18n/`, `utils/`, `context/`)
5. Configurar React Router en `App.jsx` con rutas placeholder:
   - `/` → Home
   - `/exam/:certId/config` → ExamConfig
   - `/exam/:certId/start` → ExamPage
   - `/exam/:certId/results` → ResultsPage
6. Crear `Layout.jsx` con Header (nombre de la app + selector de idioma) y Footer
7. Verificar que `npm run dev` funciona y muestra la página principal

**Criterio de aceptación:** La app arranca, muestra un header con "Test Examinator", y las rutas navegan correctamente a páginas placeholder.

---

### FASE 2: Modelo de datos y banco de preguntas ✅

**Objetivo:** Definir el formato JSON de las preguntas y crear un set de ejemplo para cada certificación.

**Formato de pregunta (`src/data/questions/az-900.json` etc.):**
```json
{
  "certification": "AZ-900",
  "version": "1.0",
  "totalQuestions": 2,
  "questions": [
    {
      "id": "az900-001",
      "type": "single",
      "question": {
        "es": "¿Qué es Azure Resource Manager?",
        "en": "What is Azure Resource Manager?"
      },
      "options": [
        {
          "id": "A",
          "text": {
            "es": "Un servicio de despliegue y gestión de recursos de Azure",
            "en": "A deployment and management service for Azure resources"
          }
        },
        {
          "id": "B",
          "text": {
            "es": "Una base de datos relacional",
            "en": "A relational database"
          }
        },
        {
          "id": "C",
          "text": {
            "es": "Un servicio de monitorización",
            "en": "A monitoring service"
          }
        },
        {
          "id": "D",
          "text": {
            "es": "Un servicio de mensajería",
            "en": "A messaging service"
          }
        }
      ],
      "correctAnswers": ["A"],
      "explanation": {
        "es": "Azure Resource Manager (ARM) es el servicio de despliegue y gestión de Azure. Proporciona una capa de gestión que permite crear, actualizar y eliminar recursos en la suscripción de Azure.",
        "en": "Azure Resource Manager (ARM) is the deployment and management service for Azure. It provides a management layer that enables you to create, update, and delete resources in your Azure subscription."
      },
      "references": [
        "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview"
      ],
      "topic": "Cloud Concepts",
      "difficulty": "easy"
    },
    {
      "id": "az900-002",
      "type": "multiple",
      "question": {
        "es": "¿Cuáles de los siguientes son modelos de servicio en la nube? (Selecciona 3)",
        "en": "Which of the following are cloud service models? (Select 3)"
      },
      "options": [
        { "id": "A", "text": { "es": "IaaS", "en": "IaaS" } },
        { "id": "B", "text": { "es": "PaaS", "en": "PaaS" } },
        { "id": "C", "text": { "es": "SaaS", "en": "SaaS" } },
        { "id": "D", "text": { "es": "DaaS", "en": "DaaS" } }
      ],
      "correctAnswers": ["A", "B", "C"],
      "explanation": {
        "es": "Los tres modelos de servicio en la nube son IaaS (Infraestructura como Servicio), PaaS (Plataforma como Servicio) y SaaS (Software como Servicio).",
        "en": "The three cloud service models are IaaS (Infrastructure as a Service), PaaS (Platform as a Service), and SaaS (Software as a Service)."
      },
      "references": [
        "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/strategy/monitoring-strategy"
      ],
      "topic": "Cloud Concepts",
      "difficulty": "easy"
    }
  ]
}
```

**Tareas:**
1. Crear `src/data/certifications.json` con el catálogo:
   ```json
   [
     {
       "id": "az-900",
       "name": "AZ-900",
       "fullName": { "es": "Azure Fundamentals", "en": "Azure Fundamentals" },
       "provider": "Microsoft",
       "icon": "microsoft",
       "color": "#0078D4",
       "examDuration": 60,
       "passingScore": 700,
       "maxScore": 1000,
       "questionsPerExam": 40,
       "totalQuestionsInBank": 0,
       "topics": ["Cloud Concepts", "Azure Architecture", "Azure Services", "Security", "Pricing"]
     }
   ]
   ```
   Incluir las 6 certificaciones listadas arriba.
2. Crear archivos JSON para cada certificación con **mínimo 10 preguntas reales/realistas** cada uno (60+ preguntas totales):
   - `src/data/questions/az-900.json` (10 preguntas)
   - `src/data/questions/az-104.json` (10 preguntas)
   - `src/data/questions/az-204.json` (10 preguntas)
   - `src/data/questions/az-305.json` (10 preguntas)
   - `src/data/questions/mcd-level-1.json` (10 preguntas)
   - `src/data/questions/mcia.json` (10 preguntas)
3. Crear `src/utils/questionParser.js` con funciones para:
   - Cargar preguntas por certificación
   - Filtrar por topic/dificultad
   - Barajar preguntas y opciones
4. Crear `src/utils/shuffle.js` (Fisher-Yates shuffle)

**Criterio de aceptación:** Se pueden importar las preguntas desde los JSON, filtrarlas y barajarlas. El formato es consistente en todos los archivos.

---

### FASE 3: Pantalla principal - Selección de certificación ✅

**Objetivo:** Página Home con las certificaciones disponibles en formato grid de tarjetas.

**Tareas:**
1. Crear `src/pages/Home.jsx`:
   - Título de bienvenida: "Prepara tu certificación"
   - Grid responsive de tarjetas (1 col mobile, 2 tablet, 3 desktop)
   - Cada tarjeta muestra: logo del proveedor, nombre de certificación, nº de preguntas disponibles, botón "Empezar"
   - Agrupar por proveedor (sección Microsoft, sección MuleSoft)
2. Crear `src/pages/ExamConfig.jsx`:
   - Recibe el `certId` de la URL
   - Muestra nombre de la certificación
   - Selector de número de preguntas (10, 20, 30, todas)
   - Selector de tiempo (sin límite, 30min, 60min, 90min, tiempo real del examen)
   - Selector de temas (todos o filtrar por topic)
   - Checkbox "Barajar orden de preguntas"
   - Checkbox "Barajar orden de opciones"
   - Botón "Comenzar Examen"
3. Estilizar con Tailwind CSS: colores del proveedor en las tarjetas, hover effects, responsive

**Criterio de aceptación:** El usuario puede ver todas las certificaciones, hacer clic en una, configurar su examen y pulsar "Comenzar" (que navegue a `/exam/:certId/start`).

---

### FASE 4: Motor de examen simulado ✅

**Objetivo:** Core de la aplicación. Examen funcional con temporizador y navegación entre preguntas.

**Tareas:**
1. Crear `src/context/ExamContext.jsx`:
   - Estado: preguntas cargadas, respuestas del usuario, pregunta actual, tiempo restante, estado del examen (in-progress/finished)
   - Actions: selectAnswer, nextQuestion, prevQuestion, goToQuestion, finishExam
2. Crear `src/hooks/useExam.js`:
   - Cargar preguntas según configuración
   - Barajar si se seleccionó
   - Gestionar selección de respuestas (single y multiple choice)
   - Calcular resultados al finalizar
3. Crear `src/hooks/useTimer.js`:
   - Cuenta atrás desde el tiempo configurado
   - Auto-finish cuando llega a 0
   - Formato mm:ss
   - Pausa si la pestaña pierde el foco (opcional)
4. Crear `src/components/Exam/QuestionCard.jsx`:
   - Muestra el texto de la pregunta en el idioma actual
   - Indica tipo: "Selecciona UNA respuesta" / "Selecciona X respuestas"
   - Muestra el topic y dificultad
5. Crear `src/components/Exam/OptionButton.jsx`:
   - Botón con la letra (A, B, C, D) y el texto
   - Estado: default, selected, (no mostrar correcto/incorrecto durante el examen)
   - Para `type: "multiple"`: checkbox style (permite seleccionar varias)
   - Para `type: "single"`: radio style (solo una)
6. Crear `src/components/Exam/Timer.jsx`:
   - Muestra tiempo restante en formato `mm:ss`
   - Se pone rojo cuando quedan menos de 5 minutos
   - Oculto si modo "sin límite"
7. Crear `src/components/Exam/ProgressBar.jsx`:
   - "Pregunta 5 de 20"
   - Barra visual de progreso
   - Indicadores de preguntas respondidas vs sin responder
8. Crear `src/components/Exam/ExamNavigation.jsx`:
   - Botones "Anterior" / "Siguiente"
   - Grid de números de pregunta (para saltar a cualquier pregunta)
   - Los números se colorean: gris (no visitada), azul (respondida), rojo (sin responder pero visitada)
   - Botón "Finalizar Examen" (con confirmación)
9. Crear `src/pages/ExamPage.jsx`:
   - Integra todos los componentes anteriores
   - Layout: Timer arriba, QuestionCard centro, Navigation abajo
   - Al finalizar (manualmente o por tiempo) → navega a resultados
10. Crear `src/utils/scoring.js`:
    - Calcular puntuación: respuestas correctas / total × 1000 (para simular escala Microsoft)
    - Determinar si aprobó según `passingScore` de la certificación
    - Generar resumen por topics

**Criterio de aceptación:** El usuario puede realizar un examen completo: ver preguntas, seleccionar respuestas, navegar entre preguntas, ver el tiempo, y finalizar el examen.

---

### FASE 5: Pantalla de resultados con explicaciones ✅

**Objetivo:** Mostrar resultados detallados con revisión de cada pregunta.

**Tareas:**
1. Crear `src/components/Results/ScoreCard.jsx`:
   - Puntuación numérica grande (ej: 780/1000)
   - Indicador visual de APROBADO ✅ / SUSPENDIDO ❌
   - Puntuación necesaria para aprobar
   - Tiempo empleado
   - Preguntas correctas / total
2. Crear `src/components/Results/ResultsSummary.jsx`:
   - Desglose por topics (tabla o barras)
   - Porcentaje de acierto por topic
   - Indicar topics débiles
3. Crear `src/components/Results/QuestionReview.jsx`:
   - Lista todas las preguntas
   - Para cada una muestra:
     - Texto de la pregunta
     - Opciones con indicadores: ✅ correcta, ❌ seleccionada incorrecta, ⚪ no seleccionada
     - Explicación detallada
     - Links a referencias/documentación
   - Filtro: "Ver todas" / "Solo incorrectas" / "Solo correctas"
4. Crear `src/pages/ResultsPage.jsx`:
   - Integra ScoreCard + ResultsSummary + QuestionReview
   - Botón "Repetir examen" (misma configuración)
   - Botón "Nuevo examen" (volver a Home)
   - Botón "Repetir solo las falladas" (nuevo examen solo con las incorrectas)

**Criterio de aceptación:** Tras finalizar un examen, el usuario ve su puntuación, desglose por temas, y puede revisar cada pregunta con su explicación.

---

### FASE 6: Multi-idioma (ES/EN)

**Objetivo:** Toda la UI disponible en español e inglés. Las preguntas ya están en ambos idiomas en los JSON.

**Tareas:**
1. Configurar `src/i18n/i18n.js`:
   - Idioma por defecto: español
   - Detección automática del idioma del navegador
   - Fallback a español
2. Crear `src/i18n/es.json` con todas las traducciones de la UI:
   ```json
   {
     "app": { "title": "Test Examinator", "subtitle": "Prepara tu certificación" },
     "home": { "welcome": "Elige una certificación", "start": "Empezar", "questions": "preguntas disponibles" },
     "config": { "title": "Configurar examen", "numQuestions": "Número de preguntas", "timeLimit": "Tiempo límite" },
     "exam": { "question": "Pregunta", "of": "de", "next": "Siguiente", "prev": "Anterior", "finish": "Finalizar", "confirmFinish": "¿Seguro que quieres finalizar?" },
     "results": { "score": "Puntuación", "passed": "¡APROBADO!", "failed": "SUSPENDIDO", "review": "Revisión de preguntas" },
     "common": { "noTimeLimit": "Sin límite", "allTopics": "Todos los temas", "minutes": "minutos" }
   }
   ```
3. Crear `src/i18n/en.json` con traducciones equivalentes en inglés
4. Añadir selector de idioma en el Header (banderitas o dropdown ES/EN)
5. Usar `useTranslation()` en todos los componentes que muestran texto
6. Las preguntas se renderizan en el idioma seleccionado accediendo a `question.question[lang]`, `option.text[lang]`, etc.

**Criterio de aceptación:** El usuario puede cambiar entre español e inglés, y tanto la UI como las preguntas se muestran en el idioma seleccionado.

---

### FASE 7: PWA, responsive y polish final

**Objetivo:** La app es instalable como PWA, perfecta en móvil y lista para producción.

**Tareas:**
1. Instalar `vite-plugin-pwa` y configurar:
   - Manifest con nombre, iconos, colores
   - Service Worker para cache offline
   - La app funciona sin conexión una vez cargada
2. Responsive design (verificar):
   - Home: 1 columna en móvil
   - ExamPage: Navegación por números colapsable en móvil
   - ResultsPage: Tablas scrolleables en móvil
3. Crear `scripts/scrape-examtopics.md`:
   - Documentación sobre el formato de preguntas esperado
   - Instrucciones sobre cómo añadir nuevas preguntas
   - Template JSON vacío para facilitar la carga manual
4. Actualizar `README.md` con:
   - Descripción del proyecto
   - Cómo ejecutar en local (`npm install` + `npm run dev`)
   - Cómo añadir preguntas nuevas
   - Cómo desplegar
   - Screenshots (placeholders)
5. Añadir meta tags para SEO básico
6. Configurar build para producción: `npm run build`

**Criterio de aceptación:** La app es instalable como PWA, se ve perfecta en móvil y escritorio, tiene documentación clara, y `npm run build` genera una versión de producción lista para desplegar.

---

## Orden de ejecución para agentes

Los agentes deben ejecutar las fases **en orden** (1 → 2 → 3 → 4 → 5 → 6 → 7).

Cada fase debe:
1. Leer este documento (`PLAN.md`) para entender el contexto
2. Implementar SOLO las tareas de su fase
3. Verificar que `npm run dev` sigue funcionando
4. Hacer commit con mensaje descriptivo: `feat(fase-X): descripción`

## Notas adicionales para los agentes

- **No instalar dependencias innecesarias**. Solo las listadas en la Fase 1.
- **Respetar el esquema JSON** de preguntas definido en la Fase 2. Es el contrato de datos.
- **Las preguntas deben ser realistas** y basadas en el contenido real de cada certificación.
- **No hardcodear textos en componentes**. Todo texto visible usa i18n (Fase 6).
- **Tailwind CSS**: usar clases utilitarias, no CSS custom salvo excepciones justificadas.
- **No crear backend ni APIs**. Todo es estático y client-side.
