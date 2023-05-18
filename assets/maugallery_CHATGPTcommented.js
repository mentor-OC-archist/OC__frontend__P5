(function($) {
    // Définition du plugin jQuery nommé "mauGallery"
    $.fn.mauGallery = function(options) {
      // Fusion des options par défaut avec les options fournies par l'utilisateur
      var options = $.extend($.fn.mauGallery.defaults, options);
      var tagsCollection = [];
  
      // Itération sur chaque élément correspondant à la sélection
      return this.each(function() {
        // Création d'un wrapper pour les éléments de la galerie
        $.fn.mauGallery.methods.createRowWrapper($(this));
  
        // Création de la lightbox si l'option lightBox est activée
        if (options.lightBox) {
          $.fn.mauGallery.methods.createLightBox(
            $(this),
            options.lightboxId,
            options.navigation
          );
        }
  
        // Ajout des écouteurs d'événements
        $.fn.mauGallery.listeners(options);
  
        // Itération sur chaque élément enfant avec la classe "gallery-item"
        $(this)
          .children(".gallery-item")
          .each(function(index) {
            // Appliquer des modifications spécifiques aux éléments d'image
            $.fn.mauGallery.methods.responsiveImageItem($(this));
  
            // Déplacer les éléments dans le wrapper de rangée
            $.fn.mauGallery.methods.moveItemInRowWrapper($(this));
  
            // Envelopper chaque élément dans une colonne en fonction du nombre de colonnes défini
            $.fn.mauGallery.methods.wrapItemInColumn($(this), options.columns);
  
            // Collecte des balises uniques pour les afficher ultérieurement
            var theTag = $(this).data("gallery-tag");
            if (
              options.showTags &&
              theTag !== undefined &&
              tagsCollection.indexOf(theTag) === -1
            ) {
              tagsCollection.push(theTag);
            }
          });
  
        // Affichage des balises si l'option showTags est activée
        if (options.showTags) {
          $.fn.mauGallery.methods.showItemTags(
            $(this),
            options.tagsPosition,
            tagsCollection
          );
        }
  
        $(this).fadeIn(500); // Affichage progressif de la galerie
      });
    };
  
    // Options par défaut du plugin
    $.fn.mauGallery.defaults = {
      columns: 3,
      lightBox: true,
      lightboxId: null,
      showTags: true,
      tagsPosition: "bottom",
      navigation: true
    };
  
    // Méthodes du plugin
    $.fn.mauGallery.methods = {
      // Création d'un wrapper de rangée pour les éléments de la galerie
      createRowWrapper(element) {
        if (
          !element
            .children()
            .first()
            .hasClass("row")
        ) {
          element.append('<div class="gallery-items-row row"></div>');
        }
      },
  
      // Envelopper un élément dans une colonne en fonction du nombre de colonnes défini
      wrapItemInColumn(element, columns) {
        if (columns.constructor === Number) {
          element.wrap(
            `<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`
          );
        } else if (columns.constructor === Object) {
          var columnClasses = "";
          if (columns.xs) {
            columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
          }
          // Ajouter d'autres classes de colonne en fonction des dimensions définies
  // (sm, md, lg, xl)
        // ...
        element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`);
      } else {
        console.error(
          `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
        );
      }
    },

    // Déplacer un élément dans le wrapper de rangée
    moveItemInRowWrapper(element) {
      element.appendTo(".gallery-items-row");
    },

    // Appliquer des modifications spécifiques aux éléments d'image pour les rendre réactifs
    responsiveImageItem(element) {
      if (element.prop("tagName") === "IMG") {
        element.addClass("img-fluid");
      }
    },

    // Ouverture de la lightbox avec l'image correspondante
    openLightBox(element, lightboxId) {
      $(`#${lightboxId}`)
        .find(".lightboxImage")
        .attr("src", element.attr("src"));
      $(`#${lightboxId}`).modal("toggle");
    },

    // Affichage de l'image précédente dans la lightbox
    prevImage() {
      // ...
    },

    // Affichage de l'image suivante dans la lightbox
    nextImage() {
      // ...
    },

    // Création de la lightbox avec les éléments nécessaires
    createLightBox(gallery, lightboxId, navigation) {
      // ...
    },

    // Affichage des balises des éléments de la galerie
    showItemTags(gallery, position, tags) {
      // ...
    },

    // Filtrage des éléments de la galerie en fonction de la balise sélectionnée
    filterByTag() {
      // ...
    }
  };
})(jQuery);