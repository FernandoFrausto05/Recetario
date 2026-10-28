import React, { useState } from 'react';
import { Search, Clock, Users, ArrowLeft, CheckCircle2, Circle, GitBranch } from 'lucide-react';

const RECIPES_DATA = [
  {
    id: 'sushi',
    title: 'Sushi Roll (Maki Tradicional)',
    category: 'Japonesa',
    prepTime: '45 min',
    servings: 2,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    description: 'Rollos de sushi caseros rellenos de salmón fresco, aguacate y pepino.',
    ingredients: [
      '2 tazas de arroz para sushi (arroz de grano corto)',
      '3 cucharadas de vinagre de arroz',
      '1 cucharada de azúcar',
      '1 cucharadita de sal',
      '4 láminas de alga Nori',
      '150g de salmón fresco (grado sushi)',
      '1 aguacate en tiras',
      '1 pepino en bastones delgados'
    ],
    steps: [
      'Lava el arroz varias veces hasta que el agua salga limpia. Cocínalo con 2.5 tazas de agua.',
      'Mezcla el vinagre de arroz, el azúcar y la sal. Vierte sobre el arroz cocido y deja enfriar.',
      'Coloca una lámina de alga Nori sobre una esterilla de bambú.',
      'Extiende una capa delgada de arroz sobre el alga, dejando 2 cm libres en el borde superior.',
      'Coloca el salmón, aguacate y pepino en el centro de manera horizontal.',
      'Enrolla con firmeza usando la esterilla y corta en 8 piezas iguales con un cuchillo húmedo.'
    ]
  },
  {
    id: 'pollo-naranja',
    title: 'Pollo a la Naranja Agridulce',
    category: 'China / Asiática',
    prepTime: '35 min',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
    description: 'Crujientes trozos de pechuga de pollo bañados en una deliciosa salsa de naranja.',
    ingredients: [
      '500g de pechuga de pollo en cubos',
      '1 huevo',
      '1/2 taza de fécula de maíz (maizena)',
      '1/2 taza de jugo de naranja natural',
      '2 cucharadas de salsa de soya',
      '2 cucharadas de miel o azúcar',
      '1 diente de ajo picado',
      'Ralladura de 1 naranja'
    ],
    steps: [
      'Cubre los trozos de pollo con el huevo batido y pásalos por la fécula de maíz.',
      'Fríe el pollo en aceite caliente hasta que esté dorado y crujiente. Escurre el exceso de aceite.',
      'En un sartén a fuego medio, mezcla el jugo de naranja, salsa de soya, miel, ajo y ralladura.',
      'Cocina la salsa hasta que comience a espesar.',
      'Agrega el pollo frito a la salsa y revuelve hasta que todos los trozos estén bien cubiertos.',
      'Sirve caliente acompañado de arroz blanco.'
    ]
  }
];

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});
  const [showGitModal, setShowGitModal] = useState(false);

  const filteredRecipes = RECIPES_DATA.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleStep = (index) => {
    setCompletedSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setCheckedIngredients({});
    setCompletedSteps({});
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      <header className="bg-orange-600 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            onClick={() => setSelectedRecipe(null)}
            className="text-2xl font-bold cursor-pointer hover:opacity-90 flex items-center gap-2"
          >
            🍳 Recetario Express
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full">
        {!selectedRecipe ? (
          <div>
            <div className="mb-8 max-w-md mx-auto relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Buscar receta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredRecipes.map((recipe) => (
                <div 
                  key={recipe.id}
                  onClick={() => handleSelectRecipe(recipe)}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden border border-slate-200 group"
                >
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="p-5">
                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {recipe.category}
                    </span>
                    <h2 className="text-xl font-bold mt-2 mb-1 text-slate-900">{recipe.title}</h2>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                    
                    <div className="flex gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1"><Clock size={14} /> {recipe.prepTime}</span>
                      <span className="flex items-center gap-1"><Users size={14} /> {recipe.servings} porciones</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 font-medium transition"
            >
              <ArrowLeft size={18} /> Volver a las recetas
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.title} 
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="p-6 md:p-8">
                <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {selectedRecipe.category}
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-2">{selectedRecipe.title}</h2>
                <p className="text-slate-600 mb-6">{selectedRecipe.description}</p>

                <div className="flex gap-6 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl mb-8">
                  <span className="flex items-center gap-1.5"><Clock size={16} className="text-orange-600" /> <b>Tiempo:</b> {selectedRecipe.prepTime}</span>
                  <span className="flex items-center gap-1.5"><Users size={16} className="text-orange-600" /> <b>Porciones:</b> {selectedRecipe.servings}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-slate-900 border-b pb-2">Ingredientes</h3>
                    <ul className="space-y-3">
                      {selectedRecipe.ingredients.map((item, idx) => (
                        <li 
                          key={idx}
                          onClick={() => toggleIngredient(idx)}
                          className={`flex items-start gap-3 cursor-pointer select-none text-sm p-2 rounded-lg transition ${checkedIngredients[idx] ? 'line-through text-slate-400 bg-slate-50' : 'hover:bg-slate-50 text-slate-700'}`}
                        >
                          {checkedIngredients[idx] ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" /> : <Circle size={18} className="text-slate-300 shrink-0 mt-0.5" />}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4 text-slate-900 border-b pb-2">Preparación Paso a Paso</h3>
                    <ol className="space-y-4">
                      {selectedRecipe.steps.map((step, idx) => (
                        <li 
                          key={idx}
                          onClick={() => toggleStep(idx)}
                          className={`flex items-start gap-3 cursor-pointer select-none text-sm p-3 rounded-xl border transition ${completedSteps[idx] ? 'border-emerald-200 bg-emerald-50/50 text-slate-400' : 'border-slate-200 hover:border-orange-200 bg-white'}`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${completedSteps[idx] ? 'bg-emerald-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
                            {idx + 1}
                          </span>
                          <span className={completedSteps[idx] ? 'line-through' : 'text-slate-700'}>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showGitModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-3 text-slate-900 flex items-center gap-2">
              <GitBranch size={20} className="text-orange-600" /> Comandos de Git
            </h3>
            <p className="text-xs text-slate-500 mb-4">Ejecuta estos comandos en tu terminal para subir la app a GitHub:</p>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs space-y-2 overflow-x-auto">
              <p><span className="text-emerald-400"># 1. Inicializar repositorio</span></p>
              <p>git init</p>
              <p><span className="text-emerald-400"># 2. Agregar archivos</span></p>
              <p>git add .</p>
              <p><span className="text-emerald-400"># 3. Guardar cambios</span></p>
              <p>git commit -m "App Recetario de React"</p>
              <p><span className="text-emerald-400"># 4. Cambiar rama y subir</span></p>
              <p>git branch -M main</p>
              <p>git remote add origin TU_URL</p>
              <p>git push -u origin main</p>
            </div>
            <button 
              onClick={() => setShowGitModal(false)}
              className="mt-5 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-xl text-sm transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <p>Proyecto Recetario React • Creado con React y Tailwind CSS</p>
      </footer>
    </div>
  );
}