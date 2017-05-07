(function(tinymce) {
  tinymce.PluginManager.add('themifyIcons', function(editor, url) {
    function getIcons() {
      return [
        ['ti-arrow-up', 'arrow-up'],
        ['ti-arrow-up', 'arrow-up'],
        ['ti-arrow-up', 'arrow-up'],
        ['ti-arrow-up', 'arrow-up'],
        ['ti-arrow-up', 'arrow-up'],
        ['ti-arrow-up', 'arrow-up'],
        ['ti-arrow-up', 'arrow-up'],
      ];
    }

    function insertIcon(chr) {
      editor.fire('insertCustomChar', {chr: chr}).chr;
      editor.execCommand('mceInsertContent', false, chr);
    }

    function showDialog() {
      var gridHtml, x, y, win;

      function getParentTd(elm) {
        while (elm) {
          if (elm.nodeName == 'TD') {
            return elm;
          }

          elm = elm.parentNode;
        }
      }

      gridHtml = '<link rel="stylesheet" href="/css/themify-icons.css" />' +
        '<table role="presentation" cellspacing="0" class="mce-charmap"><tbody>';

      var charmap = getIcons();
      var width = Math.min(charmap.length, 25);
      var height = Math.ceil(charmap.length / width);
      for (y = 0; y < height; y++) {
        gridHtml += '<tr>';

        for (x = 0; x < width; x++) {
          var index = y * width + x;
          if (index < charmap.length) {
            var chr = charmap[index];
            gridHtml += (
              '<td title="' + chr[1] + '"><div tabindex="-1" title="' + chr[1] + '" role="button" data-chr="' + chr[0] + '"><span class="' + chr[0] + '"></span></div></td>'
            );
          } else {
            gridHtml += '<td />';
          }
        }

        gridHtml += '</tr>';
      }

      gridHtml += '</tbody></table>';

      var charMapPanel = {
        type: 'container',
        url: 'icon-template.html',
        onclick: function(e) {
          var target = e.target;
          console.log(e.target);
          if (/^(TD|DIV)$/.test(target.nodeName)) {
            if (getParentTd(target).firstChild) {
              editor.insertContent(
                '<span class="ti-arrow-up">&nbsp;</span>'
              );
              // console.log('<span class="'+ getParentTd(target).firstChild.getAttribute('data-chr') +'"></span>');
              // insertIcon('<span class="'+ getParentTd(target).firstChild.getAttribute('data-chr') +'"></span>');

              if (!e.ctrlKey) {
                win.close();
              }
            }
          }
        },
      };

      win = editor.windowManager.open({
        title: 'Themify Icons',
        type: 'container',
        url: 'icon-template.html',
        // html: gridHtml,
        spacing: 10,
        padding: 10,
        width: 960,
        height: 400,
        onclick: function(e) {
        },
        buttons: [
          {text: 'Close', onclick: function() {
            win.close();
          }},
        ],
      });
    }

    editor.addCommand('showThemifyIcons', showDialog);

    editor.addButton('themifyIconsBtn', {
      text: 'Icons',
      tooltip: 'themify icons',
      cmd: 'showThemifyIcons',
    });

    return {
      getIcons: getIcons,
      insertIcon: insertIcon,
    };
  });
})(tinymce);
