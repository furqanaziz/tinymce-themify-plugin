(function(tinymce) {
  tinymce.PluginManager.add('themifyIcons', function(editor, url) {
    function showDialog() {
      var win;
      win = editor.windowManager.open({
        title: 'Themify Icons',
        type: 'container',
        url: 'bower_components/tinymce-themify-plugin/icon-template.html',
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
      icon: 'themifyIconsBtn',
      tooltip: 'themify icons',
      cmd: 'showThemifyIcons',
    });
  });
})(tinymce);
