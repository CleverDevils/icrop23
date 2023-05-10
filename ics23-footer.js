
  const headerTemplate = /*html*/`
    <div id="triangle-shape" class="triangle-bottomright"></div>
    <div id="custom-header-content">
      <img id="header-img" src="https://assets-private.eventfinity.co/materials/1756491/original/012519_ICS_WebBanners-926.png" alt="innovations">
    </div>
  `

  function addFullAgendaLink(targetElSelector, prepend = false) {
    $(targetElSelector)[prepend ? 'prepend' : 'append'](/*html*/`
      <div class="agenda-at-a-glance-wrapper">
        <a class="agenda-at-a-glance" target="_blank" href= "[[efasset:2365501]]">
          <h4 class="full-agenda-title">OVERALL AGENDA</h4>
          </a>
      </div>
    `)
  }
  $(".plugin__header").prepend(headerTemplate)

  function addHowToVideo(selector, embed = false, append = true, after = false) {
    const vimeoURL = "https://player.vimeo.com/video/715634330?h=b3ecae8678"
    const embedTemplate = /*html*/`
    <div id="how-to-video-embed" class="embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item" src="${vimeoURL}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </div>
    `
    const modalHtml = /*html*/`
    <!-- Button trigger modal -->
    <div id="how-to-btn-wrapper" class="text-center mb-2">
      <button id="how-to-video-modal-btn" type="button" class="btn btn-primary" data-toggle="modal" data-target="#how-to-modal">
        Digital Platform Instructions
      </button>
    </div>
    <div style="clear:both;"></div>

    <!-- Modal -->
    <div  class="modal fade" id="how-to-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Digital Platform Instructions</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="embed-responsive embed-responsive-16by9">
              <iframe class="embed-responsive-item" src="${vimeoURL}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `
    let targetHtml = embed ? embedTemplate : modalHtml
    if (after) {
      $(selector).after(targetHtml)
    }
    else if (append) {
      $(selector).append(targetHtml)
    }
    else {
      $(selector).prepend(targetHtml)
    }

  }
  if (window.location.pathname === "/event") {
    $("body").addClass("event");
    $(document).ready(() => {
      addHowToVideo('.hs-agenda-block')
      addFullAgendaLink(".hs-title")
      const agendaDataJson = $("[data-js-hs-agenda-block]").attr('data-js-hs-agenda-block')
      // console.log('json: ', agendaDataJson)
      if (agendaDataJson) {
        const agendaData = JSON.parse(agendaDataJson)
        console.log('agenda data: ', agendaData)
      }


      $(".hsa-card").each((index, item) => {
        const agendaIdMatch = $(item).attr('id').match(/(nowLink)(.*)/)
        if (agendaIdMatch) {
          try {
            const agendaId = agendaIdMatch[2]
            const agendaLink = `https://ics2023.eventfinity.co/schedule/${agendaId}/detail`
            setTimeout(() => {
              const $aTags = $(item).find("a")
              console.log('atgs: ', $aTags)
              $aTags.attr('href', agendaLink)
            }, 1000)

          }
          catch (error) {
            console.warn(error)
          }
        }
        const $pElement = $(item).find('.hsa-card__title p')
        $pElement.addClass('hp-ag-desc')
        $pElement.prependTo($(item).find('.hsa-card__content'))

        const $cardImg = $(item).find('.hsa-card__image')
        const agUrl = $cardImg.data('url')
        const gaCat = $cardImg.data('ga-category')
        const gaAction = $cardImg.data('ga-action')
        const title = $cardImg.attr('title')
        const gaId = $cardImg.data('ga-id')
        const gaLabel = $cardImg.data('ga-label')
        $(item).find(".hsa-card__content").prepend(/*html*/`
      <div class="ag-card-see-more read-more-wrapper">
        <a href="${agUrl}" 
          class="agenda-card-see-more-a read-more-a"
          data-ga-label="${gaLabel}"
          data-ga-id="${gaId}"
          data-ga-action = "${gaAction}"
          data-url="${agUrl}"
          title="${title}"
          >
          <div class="ai-read-more read-more-text">Read
            More</div></a></div>
      `)
      })

      function agendaSize() {
        let ics_agenda_wrap_height = 0;
        $('.show-hs-agenda-link').slice( 0, 3 ).each(function() {
            ics_agenda_wrap_height += $(this).outerHeight();
        });
        let ics_agenda_block_height = ($('.hs-title').outerHeight() + ics_agenda_wrap_height + 32);
        $('#homescreen_content .hs-block .hs-agenda-block').height(ics_agenda_block_height+"px");
        $('#how-to-btn-wrapper').insertAfter( $('#homescreen_content .hs-block .hs-agenda-block')); 
      }
      agendaSize();
      $(window).resize(function(){
        agendaSize();
      })
    })




    // $(document).ready(() => {
    // })

    $(".main-content__container").prepend(
      `<div class="plugin__header col-12">
      ${headerTemplate}
      </div>
      
      `)
  }

  if (window.location.pathname.includes('/login')) {
    $(".card-body").after("<p>If you need assistance, please contact help desk by typing into chat bubble found on the bottom right of the page.</p><p>The site is best viewed using Google Chrome or Firefox from your desktop or laptop computer. Internet Explorer and Safari are not supported.</p><p>Please follow all company security policies. Do not screen record sessions or share materials with external parties.</p>")
    addHowToVideo('.login-card-form', embed = false, append = false, after = true)
    var SSOButton = $('#sso_url').parent().parent();
    $('.login-card__login-copy').append(SSOButton); 
    $('.login-card__login-copy').append("<br><p>If you do not wish to login using SSO, you may login below using the password given during registration.</p><br><a href='#' id='showLogin'>Click here to login with email and password</a>");
    $('body').on('click','#showLogin',function(){
       $('.card-text.login-card__text').fadeToggle('slow');
    });
  }

  if (window.location.pathname.includes('/libraries/398798')) {
    // faq 
    addHowToVideo('.faq-container', embed = true, append = false)
  }


  if (window.location.pathname.includes('schedule/707')) {
    $("#agenda-title").text("Mini Syms")
    $("#agenda-title").addClass('show')
  }




  function addAgendaContent() {
    $(function () {
      $("#mini-accordion").accordion({
        // collapsible: true,
        // active: true,
      });
    });

    const miniSymMap = {
      1459724: 708
    }

    const agendaIdRe = window.location.pathname.match(/schedule\/(\d+)\/detail/)
    const agendaId = agendaIdRe[1]
    const MINI_SIM_LONG_DESC = ""
    const FILTER_ID = miniSymMap[agendaId] || null

    if (!FILTER_ID) return

    const agendaDetailTemplate = /*html*/`

      <div id="mini-sim-desc-long">${MINI_SIM_LONG_DESC}</div>
      <div id="mini-accordion" >
        <div id="mini-sim-expand-btn-wrapper"></div>
        <div id="mini-sim-iframe-wrapper"><iframe id="mini-sym-iframe" style="width:100%; height:400px;" src="/schedule/${FILTER_ID}?minisim=true"></iframe></div>
      </div>
      `
    $(".agenda-detail__container").append(agendaDetailTemplate)
  }
  // if (window.location.pathname.match(/schedule\/\d+\/detail/)) {
  //   addAgendaContent()
  // }


  // UPDATE SETTINGS NAV TEXT TO ASSISTANCE 
  $('.settings-side-nav-title > a > span').text('Resources');


  // if (window.location.search.includes('minisim')) {
  //   $("body").addClass('mini-sim-iframe')
  //   const urlSearchParams = new URLSearchParams(window.location.search);
  //   const params = Object.fromEntries(urlSearchParams.entries());
  //   $(".agenda-detail__content").prepend(/*html*/`
  //     <a class="back-a" href=${params.back}><div id="back-btn"><- Back</div></a>
  //   `)

  //   $(document).ready(() => {
  //     $(".agenda__tab-content").on('click', (event) => {

  //       const $closestA = $(event.target.closest('a'))
  //       console.log($closestA)
  //       if (event.target.closest('a') && $(event.target.closest('a')).hasClass('agenda__item-detail-page-link')) {
  //         console.log('has an a')
  //         event.preventDefault()
  //         const newUrl = $closestA.attr('href') + "?minisim=true&back=" + window.location.href
  //         window.location.href = newUrl
  //       }
  //       else {
  //         console.log('no a')
  //       }
  //     })
  //   })

  // }
  // if (window.location !== window.parent.location) {
  //   $("body").addClass('in-iframe')
  // }
  if (window.location.pathname.includes('schedule')) {

    $("body").addClass('grouped-agenda')
    $("#agenda-title").toggleClass('col-md-7 col-md-4')
    $(".agenda__search-container").toggleClass('col-md-5 col-md-8')
    $(".agenda__search-container").prepend(/*html*/`
    <div id="custom-mini-sym-switch" class="input-group">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">Order By</label>
      </div>
      <select id="agenda-order-select" class="custom-select">
        <option value="session_type">Session Type</option>
        <option value="start_time">Start Time</option>
      </select>
    </div>
    `)
    addFullAgendaLink(".agenda__search-container", true)

    $(document).ready(() => {
      const setOrder = (newOrder) => {
        switch (newOrder) {
          case 'session_type':
            $("body").addClass('grouped-agenda')
            $("body").removeClass('order-by-start')
            break;

          case 'start_time':
            $("body").addClass('order-by-start')
            $("body").removeClass('grouped-agenda')
            break;
          default:
            break;
        }
      }
      const storedCurOrderBy = localStorage.getItem('ics_order_by') || 'session_type'
      setOrder(storedCurOrderBy)
      $("#agenda-order-select").val(storedCurOrderBy)
      $("#agenda-order-select").on('change', (event) => {
        console.log($("#agenda-order-select").val())
        const orderType = event.target.value
        localStorage.setItem('ics_order_by', orderType)
        setOrder(orderType)
      })
    })
  }

  if (window.location.pathname.match(/schedule\/\d+\/detail/)) {
    $(".agenda-detail__information").prepend(/*html*/`
      <a class="back-a" ><div id="back-btn" class="pb-2"><i class="fas fa-arrow-left"></i> Back</div></a>
    `)
    $(".back-a").on('click', (evt) => {
      window.history.back()
    })
    $(".plugin-link a").addClass('btn')
  }



