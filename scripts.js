// NAVBAR
let lastScrollTop = 0;
let navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
   const scrollTop = window.pageYOffset || this.document.documentElement.scrollTop;
   if (scrollTop > lastScrollTop) {
      navbar.style.top = '-50px';
   } else {
      navbar.style.top = '0';
   }
   lastScrollTop = scrollTop;
});

// PROGRESS BAR
let progressBars = document.querySelectorAll('[data-role="progressbar"');
for (let progressBar of progressBars) {
   let bar = document.createElement('div');
   bar.classList.add('bar');
   let img = document.createElement('img');
   img.setAttribute('src', progressBar.getAttribute('data-src'));
   bar.appendChild(img);
   let text = document.createTextNode(' ' + progressBar.getAttribute('data-name'));
   bar.appendChild(text);
   progressBar.appendChild(bar);

   let progressBarValue = progressBar.getAttribute('data-value');
   let progress = document.createElement('div');
   progress.classList.add('progress');
   let progressbar = document.createElement('div');
   progressbar.classList.add('progress-bar', 'progress-bar-striped', 'progress-bar-animated');
   progressbar.setAttribute('role', 'progressbar');
   progressbar.setAttribute('aria-valuemin', '0');
   progressbar.setAttribute('aria-valuemax', '100');
   progressbar.setAttribute('aria-valuenow', progressBarValue);
   progressbar.style.width = progressBarValue + '%';
   progressbar.style.backgroundColor = progressBar.getAttribute('data-color');
   progressbar.textContent = progressBarValue + '%';
   progress.appendChild(progressbar);
   progressBar.appendChild(progress);
}

// TYPED
const typed = new Typed('.typed', {
   strings: [
      `Bonjour , je m'appelle Nicolas Goguey.`,
      `Aprés une carriére sur Mirage 2000D, je me suis dirigé vers l'instruction, et le savoir faire n'étant rien sans le savoir être.
      Je me suis spécialisé dans le Crew Ressource Management, ces compétences m'ont ammené à devenir Designer de la nouvelle matière crée avec l'EASA
      le KSA 100. Suite à la crise Covid, il a fallu créer et administrer  des Learning Management Systems, élaborer des cours digitaux avec Scenari, 
      Depuis 2022 je me forme à la gestion de projet et notamment aux methodes agiles, c'est donc naturellement que je participe à l'elaboration du projet Samrtschool de l'Armée de l'Air et de l'Espace
      .<br>
      De nature curieuse, j'aime apprendre et m'adapter pour relever de nouveaux challenges.`,
   ],
   typeSpeed: 20,
   backSpeed: 5,
});

// COMPTEUR LIVE
let compteur = 0;
$(window).scroll(function () {
   const top = $('.counter').offset().top - window.innerHeight;

   if (compteur == 0 && $(window).scrollTop() > top) {
      $('.counter-value').each(function () {
         let $this = $(this),
            countTo = $this.attr('data-count');
         $({ countNum: $this.text() }).animate(
            { countNum: countTo },
            {
               duration: 10000,
               easing: 'swing',
               step: function () {
                  $this.text(Math.floor(this.countNum));
               },
               complete: function () {
                  $this.text(this.countNum);
               },
            },
         );
      });
      compteur = 1;
   }
});

// AOS
AOS.init();
document.addEventListener('aos:in', ({ detail }) => {
   console.log('animated in', detail);
});

document.addEventListener('aos:out', ({ detail }) => {
   console.log('animated out', detail);
});

// MAIL
function after_form_submitted(data) {
   if (data.result == 'success') {
      $('form#reused_form').hide();
      $('#success_message').show();
      $('#error_message').hide();
   } else {
      $('#error_message').append('<ul>');

      jQuery.each(data.errors, function (key, val) {
         $('#error_message ul').append($('<li>').text(val));
      });
      $('#success_message').hide();
      $('#error_message').show();

      //reverse the response on the button
      $('button[type="button"]', $form).each(function () {
         $btn = $(this);
         label = $btn.prop('orig_label');
         if (label) {
            $btn.prop('type', 'submit');
            $btn.text(label);
            $btn.prop('orig_label', '');
         }
      });
   } //else
}

$('#reused_form').submit(function (e) {
   e.preventDefault();

   $form = $(this);
   //show some response on the button
   $('button[type="submit"]', $form).each(function () {
      $btn = $(this);
      $btn.prop('type', 'button');
      $btn.prop('orig_label', $btn.text());
      $btn.text('Envoi en cours ...');
   });

   $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/api/mail/send',
      data: $form.serialize(),
      success: after_form_submitted,
      error: () => after_form_submitted({ errors: ["Connexion à l'API impossible"] }),
      dataType: 'json',
   });
});

// PRE-REMPLISSAGE DU FORM
document.querySelector('#name').value = 'votre nom';
document.querySelector('#email').value = 'votre email';
document.querySelector('#message').value = "ecrivez votre message ici.";

// TODO Ajouter une barre de progression en haut de la page
// https://www.alsacreations.com/article/lire/1615-cest-quoi-le-responsive-web-design.html

// e = s('.lecture:first');
// 0 < e.length &&
//    ((alsacreations.$window = s(window)),
//    (alsacreations.lp = s('<div class="progress"></div>')),
//    alsacreations.lp.appendTo('#hrtop'),
//    (alsacreations.lpmin = e.offset().top),
//    (alsacreations.lph = e.height()),
//    alsacreations.$window.off('scroll.lecture').on('scroll.lecture', function () {
//       clearTimeout(alsacreations.lectureTimeout),
//          (alsacreations.lectureTimeout = setTimeout(function () {
//             var e = Math.min(
//                (Math.max(alsacreations.$window.scrollTop() - alsacreations.lpmin, 0) / alsacreations.lph) * 100,
//                100,
//             );
//             alsacreations.lp.width(e + '%');
//          }, 150));
//    }));