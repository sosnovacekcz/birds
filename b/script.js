$(document).ready(function() {
    // Načtení dat z externího JSON souboru
    $.getJSON('ptaci.json', function(data) {
        const kontejner = $('#ptaci-kontejner'); // Místo, kam budeme vkládat karty

        // Pro každý záznam (ptáka) v JSON souboru...
        $.each(data, function(index, ptak) {
            
            // Sestavení HTML pro tagy (štítky)
            let tagyHtml = '';
            if (ptak.tagy && ptak.tagy.length > 0) {
                ptak.tagy.forEach(function(tag) {
                    tagyHtml += `<div class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs">${tag}</div>`;
                });
            }

            // Sestavení HTML pro tip (pokud existuje)
            let tipHtml = '';
            if (ptak.tip) {
                tipHtml = `
                    <div>
                        <h4 class="font-semibold text-sm text-primary mb-1">💡 Tip pro vaší zahradu:</h4>
                        <p class="text-sm text-muted-foreground leading-relaxed">${ptak.tip}</p>
                    </div>
                `;
            }

            // Sestavení kompletní HTML "karty" pro jednoho ptáka
            const kartaHtml = `
                <div class="rounded-lg border text-card-foreground shadow-sm overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-card">
                    <div class="aspect-square overflow-hidden">
                        <img src="${ptak.obrazekSrc}" alt="${ptak.obrazekAlt}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
                    </div>
                    <div class="flex flex-col space-y-1.5 p-6 pb-3">
                        <h3 class="tracking-tight text-xl text-primary font-bold">${ptak.nazev}</h3>
                        <div class="flex flex-wrap gap-1">
                            ${tagyHtml}
                        </div>
                        <p class="text-sm text-muted-foreground leading-relaxed">${ptak.popis}</p>
                    </div>
                    <div class="p-6 pt-0 space-y-3">
                        <div>
                            <h4 class="font-semibold text-sm text-primary mb-1">🏠 Hnízdění:</h4>
                            <p class="text-sm text-muted-foreground leading-relaxed">${ptak.hnizdeni}</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-sm text-primary mb-1">🍽️ Potrava:</h4>
                            <p class="text-sm text-muted-foreground leading-relaxed">${ptak.potrava}</p>
                        </div>
                        ${tipHtml}
                    </div>
                </div>
            `;

            // Přidání vytvořené karty do kontejneru na stránce
            kontejner.append(kartaHtml);
        });
    }).fail(function() {
        // Vypíše chybovou hlášku, pokud se soubor nepodaří načíst
        $('#ptaci-kontejner').html('<p style="color: red; text-align: center;">Nepodařilo se načíst data o ptácích. Zkontrolujte prosím soubor ptaci.json a jeho umístění.</p>');
    });
});
