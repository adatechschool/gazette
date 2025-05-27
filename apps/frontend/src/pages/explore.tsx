import React from 'react';

const Explore = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explorer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Exemple de cartes de contenu */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Contenu {item}</h2>
            <p className="text-gray-600">
              Description du contenu {item}. Cliquez pour en savoir plus.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore; 