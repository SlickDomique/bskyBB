import twemoji from '@twemoji/api'
import BBCodeParser from 'js-bbcode-parser/src/index.js'
import sanitizeHtml from 'sanitize-html'

import icon_biggrin from '@/assets/images/smiles/icon_biggrin.gif'
import icon_confused from '@/assets/images/smiles/icon_confused.gif'
import icon_cool from '@/assets/images/smiles/icon_cool.gif'
import icon_cry from '@/assets/images/smiles/icon_cry.gif'
import icon_curve from '@/assets/images/smiles/icon_curve.gif'
import icon_eek from '@/assets/images/smiles/icon_eek.gif'
import icon_evil from '@/assets/images/smiles/icon_evil.gif'
import icon_exclaim from '@/assets/images/smiles/icon_exclaim.gif'
import icon_idea from '@/assets/images/smiles/icon_idea.gif'
import icon_lol from '@/assets/images/smiles/icon_lol.gif'
import icon_mad from '@/assets/images/smiles/icon_mad.gif'
import icon_mrgreen from '@/assets/images/smiles/icon_mrgreen.gif'
import icon_neutral from '@/assets/images/smiles/icon_neutral.gif'
import icon_question from '@/assets/images/smiles/icon_question.gif'
import icon_razz from '@/assets/images/smiles/icon_razz.gif'
import icon_redface from '@/assets/images/smiles/icon_redface.gif'
import icon_rolleyes from '@/assets/images/smiles/icon_rolleyes.gif'
import icon_sad from '@/assets/images/smiles/icon_sad.gif'
import icon_smile from '@/assets/images/smiles/icon_smile.gif'
import icon_smile2 from '@/assets/images/smiles/icon_smile2.gif'
import icon_square from '@/assets/images/smiles/icon_square.gif'
import icon_surprised from '@/assets/images/smiles/icon_surprised.gif'
import icon_twisted from '@/assets/images/smiles/icon_twisted.gif'
import icon_wink from '@/assets/images/smiles/icon_wink.gif'

const limitedBBCodeParser = new BBCodeParser({
  '\\[br\\]': '<br>',

  '\\[b\\](.+?)\\[/b\\]': '<strong>$1</strong>',
  '\\[i\\](.+?)\\[/i\\]': '<em>$1</em>',
  '\\[u\\](.+?)\\[/u\\]': '<u>$1</u>',

  '\\[h1\\](.+?)\\[/h1\\]': '<h1>$1</h1>',
  '\\[h2\\](.+?)\\[/h2\\]': '<h2>$1</h2>',
  '\\[h3\\](.+?)\\[/h3\\]': '<h3>$1</h3>',
  '\\[h4\\](.+?)\\[/h4\\]': '<h4>$1</h4>',
  '\\[h5\\](.+?)\\[/h5\\]': '<h5>$1</h5>',
  '\\[h6\\](.+?)\\[/h6\\]': '<h6>$1</h6>',

  '\\[p\\](.+?)\\[/p\\]': '<p>$1</p>',
  '\\[code\\](.+?)\\[/code\\]': '<pre>$1</pre>',

  '\\[color=([a-zA-Z0-9#]+)\\](.+?)\\[/color\\]': '<span style="color:$1">$2</span>',
  '\\[size=([0-9]+)\\](.+?)\\[/size\\]': '<span style="font-size:$1px">$2</span>',

  '\\[list\\](.+?)\\[/list\\]': '<ul>$1</ul>',
  '\\[\\*\\](.+?)\\[/\\*\\]': '<li>$1</li>',
})

export const emojiGifCodes = {
  '1f600': icon_biggrin,
  '1f60a': icon_square,
  '1f642': icon_smile,
  '1f928': icon_confused,
  '1f60e': icon_cool,
  '1f622': icon_cry,
  '1fae4': icon_curve,
  '1f632': icon_eek,
  '1f47a': icon_evil,
  2757: icon_exclaim,
  '1f4a1': icon_idea,
  '1f923': icon_lol,
  '1f621': icon_mad,
  '1f601': icon_mrgreen,
  '1f610': icon_neutral,
  '1f914': icon_question,
  '1f61c': icon_razz,
  '1f633': icon_redface,
  '1f644': icon_rolleyes,
  '1f614': icon_sad,
  '1f603': icon_smile2,
  '1f604': icon_smile,
  '1f643': icon_surprised,
  '1f92a': icon_twisted,
  '1f609': icon_wink,
}

export const parseBBCode = (input) => {
  return limitedBBCodeParser.parse(
    parseEmotes(
      sanitizeHtml(input, {
        disallowedTagsMode: `recursiveEscape`,
      }),
    ),
  )
}

export const parseEmotes = (input) => {
  const parsed = twemoji.parse(input, {
    callback: function (icon, options) {
      if (emojiGifCodes[icon]) {
        return emojiGifCodes[icon]
      }
      return ''.concat(options.base, options.size, '/', icon, options.ext)
    },
  })
  return parsed
}
