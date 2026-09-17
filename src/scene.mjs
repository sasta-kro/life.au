const repeat = (count, render) => Array.from({ length: count }, (_, index) => render(index)).join('');
const use = (id, x, y, scale = 1, extra = '') => `<use href="#${id}" transform="translate(${x} ${y}) scale(${scale})" ${extra}/>`;

function crane(x, baseline, height, scale, duration, phase, shortLift = false) {
  const mast = repeat(Math.ceil(height / 19), i => `<path d="M-7 ${-i * 19}L7 ${-(i + 1) * 19}M7 ${-i * 19}L-7 ${-(i + 1) * 19}M-7 ${-i * 19}H7"/>`);
  const jib = repeat(17, i => `<path d="M${-224 + i * 18} 0l18 -12v12l-18 -12"/>`);
  const lift = shortLift ? ';--drop-low:60px;--drop-mid:48px;--drop-high:24px;--cable-low:1;--cable-mid:.8;--cable-high:.4' : '';
  return `<g transform="translate(${x} ${baseline}) scale(${scale})" class="crane crane-${x}" style="--cycle:${duration}s;--phase:${phase}s${lift}">
    <path d="M-27 0h54l-9 -12h-36z" fill="#a39489"/>
    <g stroke="var(--red)" fill="none" stroke-width="1.15"><path d="M-7 0V-${height + 25}h14V0"/>${mast}</g>
    <path d="M2 0V-${height + 25}" stroke="#790d20" stroke-width="2"/>
    <g transform="translate(0 -${height})">
      <path d="M-224 -12L0 -53 80 -12M0 -53V-12" stroke="#92142a" stroke-width="1" fill="none"/>
      <g stroke="var(--red)" stroke-width="1.2" fill="none">${jib}<path d="M-224 0v-12H82V0Z"/></g>
      <path d="M-224 1H85" stroke="#760b1e" stroke-width="3"/>
      <rect x="57" y="-11" width="26" height="30" fill="#8a1429"/>
      <path d="M64 -11v30M74 -11v30" stroke="#ac3347"/>
      <path d="M-18 3h29v17h-29z" fill="#a40b24"/><path d="M-15 6h15v9h-15z" fill="#d9c6b5"/><path d="M-7 6v9" stroke="#684b46"/>
      <rect x="-8" y="-27" width="16" height="8" fill="#a40b24"/>
      <circle cx="0" cy="-56" r="2.5" fill="#df4b47" class="beacon motion"/>
      <g transform="translate(-204 4)"><g class="crane-trolley motion">
        <rect x="-5" y="-3" width="13" height="6" fill="#543b35"/>
        <g class="hoist-cable motion"><path d="M0 0v60M3 0v60" stroke="#685047" stroke-width=".85"/></g>
        <g class="hoist-load motion"><g class="load-sway motion">
          <path d="M0 0v6q5 0 3 5q-3 3 -5 -1M1 11L-23 29M1 11L25 29" stroke="#5d463e" fill="none" stroke-width="1.1"/>
          <path d="M-28 28h57v11h-57z" fill="#a49587"/><path d="M-28 28h57v3h-57z" fill="#d1c2b2"/><path d="M-28 39h57" stroke="#78665c" stroke-width="1.2"/>
        </g></g>
      </g></g>
    </g>
  </g>`;
}

function building(x, y, width, floors, scaffold = false) {
  const height = floors * 30;
  const columns = Math.floor(width / 27);
  const windows = repeat(floors, row => repeat(columns, col => {
    const wx = 12 + col * 27, wy = 9 + row * 30;
    const lit = (col + row) % 4 === 0;
    return `<rect x="${wx}" y="${wy}" width="13" height="20" fill="#695950"/><rect x="${wx + 2}" y="${wy + 1}" width="9" height="16" fill="${lit ? '#e7c48c' : '#a5907d'}" ${lit ? `class="window-light motion" style="animation-delay:-${row * 3 + col}s"` : ''}/><path d="M${wx + 6.5} ${wy}v19M${wx} ${wy + 10}h13" stroke="#b0a092" stroke-width="1"/>`;
  }));
  const frame = scaffold ? `<g stroke="#79655a" stroke-width="1" fill="none" opacity=".85">${repeat(columns + 2, col => `<path d="M${col * 25 - 8} -20V${height + 4}"/>`)}${repeat(floors + 1, row => `<path d="M-13 ${row * 30 - 5}H${width + 15}M-13 ${row * 30 - 2}H${width + 15}"/>${repeat(columns, col => `<path d="M${col * 25 - 8} ${row * 30 - 5}l25 30"/>`)}`)}</g>` : '';
  return `<g transform="translate(${x} ${y})"><path d="M${width} 0l24 12v${height - 12}h-24" fill="#928074"/>
    <rect width="${width}" height="${height}" fill="#b9a797"/>
    ${repeat(floors, row => `<path d="M0 ${row * 30}h${width}" stroke="#d8c9b9" stroke-width="4"/>`)}${windows}
    <path d="M-4 0h${width + 8}v-6H-4z" fill="#9e8a7b"/>${scaffold ? repeat(columns + 1, i => `<path d="M${i * 26 + 5} -6v-14m3 14v-18" stroke="#7f655a" stroke-width="1.4"/>`) : ''}
    ${frame}</g>`;
}

export function constructionScene() {
  return `<svg class="construction-scene" viewBox="0 0 1440 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="stone" x2="1" y2="0"><stop stop-color="#d1c1ae"/><stop offset=".7" stop-color="#bca998"/><stop offset="1" stop-color="#a48b7a"/></linearGradient>
      <linearGradient id="sun" x2="0" y2="1"><stop stop-color="#eedac0" stop-opacity=".52"/><stop offset="1" stop-color="#eedac0" stop-opacity=".08"/></linearGradient>
      <pattern id="fence" width="5" height="29" patternUnits="userSpaceOnUse"><path d="M1 0v29" stroke="#a29387" stroke-width="1"/></pattern>
      <g id="tree">
        <path d="M0 -66v70m0 -32l-13 -17m13 8l15 -16" stroke="#6e5045" stroke-width="2.3" fill="none"/>
        <path d="M-2 -90c-8 -4 -16 3 -15 10c-13 -1 -20 12 -13 21c-15 6 -15 22 -3 27c-9 13 4 23 14 21c5 13 20 13 26 4c13 5 23 -5 20 -15c15 -5 15 -22 3 -28c6 -11 -2 -22 -12 -23c1 -10 -10 -19 -20 -17z" fill="currentColor"/>
        <path d="M0 -76v67m-1 -22l-16 -16m17 4l17 -14" stroke="#55132a" stroke-width="1" opacity=".24" fill="none"/>
      </g>
      <g id="cypress"><path d="M0 -85Q-20 -37 -13 -5Q0 4 13 -5Q20 -37 0 -85" fill="currentColor"/><path d="M0 -61v69" stroke="#774839" stroke-width="1.6"/></g>
      <g id="palm"><path d="M0 0q-6 -32 0 -61" stroke="#9a806a" stroke-width="3"/><path d="M0 -60q-26 -22 -37 4q19 -11 37 -4q-16 -32 -28 -25q20 4 28 25q0 -33 14 -31q-10 16 -14 31q23 -27 37 -8q-22 -3 -37 8q26 -6 32 15q-21 -20 -32 -15" fill="currentColor"/></g>
      <g id="arch"><path d="M0 38V13a11 11 0 0 1 22 0v25z" fill="#8a7667"/><path d="M3 38V14a8 8 0 0 1 16 0v24" fill="#b2a18e"/><path d="M0 13a11 11 0 0 1 22 0" fill="none" stroke="#e4d6c5" stroke-width="3"/></g>
      <g id="lamp"><path d="M0 0v-40q0 -7 7 -7h3" fill="none" stroke="#5a4b44" stroke-width="1.5"/><path d="M7 -46h7l-1 6h-5z" fill="#c4b296"/><path d="M6 -48h9" stroke="#5a4b44" stroke-width="2"/></g>
      <g id="person"><circle cy="-18" r="2.3" fill="#453931"/><path d="M0 -15v9m-3 -7l-1 7m7 -7l1 7M0 -6l-3 7m3 -7l3 7" stroke="#453931" stroke-width="1.9" stroke-linecap="round" fill="none"/></g>
      <g id="worker"><circle cy="-18" r="2.4" fill="#87664c"/><path d="M-3 -19q0 -5 6 0" fill="#c09b6b"/><path d="M-3 -15h6v9h-6z" fill="#a40b24"/><path d="M-3 -14l-2 7m8 -7l2 7M-1 -6l-2 7m4 -7l2 7" stroke="#56473e" stroke-width="1.6" stroke-linecap="round" fill="none"/></g>
      <g id="shuttle">
        <ellipse cx="69" cy="1" rx="76" ry="3" fill="#715c4e" opacity=".13"/>
        <path d="M2 -7v-23l5 -5h105l20 13l7 14v7H0v-6z" fill="#a40b24"/>
        <path d="M4 -30h107l15 11H4z" fill="#e0ceb6"/>
        <path d="M10 -28h87v13H10z" fill="#554a41"/>
        <path d="M104 -28h8l13 10h-21z" fill="#746c5d"/>
        ${repeat(6, i => `<path d="M${i * 14 + 12} -28v15" stroke="#d7bfa0" stroke-width="2"/><path d="M${i * 14 + 14} -13h8v6h-8z" fill="#dcba97"/>`)}
        <path d="M-3 -34h116l5 4H-3z" fill="#7b0b1f"/>
        <path d="M0 -6h136" stroke="#ebd8bc" stroke-width="2"/>
        <rect x="132" y="-12" width="5" height="3" rx="1" fill="#f5e3b7"/>
        <circle cx="20" cy="-3" r="7" fill="#352d28"/><circle cx="20" cy="-3" r="3" fill="#beaa90"/>
        <circle cx="117" cy="-3" r="7" fill="#352d28"/><circle cx="117" cy="-3" r="3" fill="#beaa90"/>
      </g>
    </defs>
    <circle cx="1206" cy="144" r="133" fill="url(#sun)"/>
    <g fill="#e8ded2" opacity=".48" class="cloud-drift motion"><path d="M36 155q15 -15 27 -8q13 -27 35 -7q13 -9 26 6q14 -4 20 9z"/><path d="M922 91q12 -13 22 -5q11 -21 29 -5q14 -7 22 10z"/><path d="M1277 194q13 -15 31 -8q22 -30 41 -4q14 -8 26 12z"/></g>
    <g fill="#e8dfd3"><path d="M0 302h76v-35h39v-20h50v55h42v-30h72v-48h34v78h73v-38h73v38h83v-48h53v48h146v-52h50v52h81v-38h92v38h81v-53h48v53h74v-28h92v28h131v-49h34v49h24v78H0z"/></g>
    <g color="#d7cbbb">${use('tree', 38, 325, .82)}${use('tree', 208, 325, .75)}${use('tree', 455, 325, .64)}${use('tree', 1320, 325, .7)}${use('tree', 1415, 325, .9)}</g>
    ${building(78, 241, 130, 3)}
    ${building(340, 208, 154, 4, true)}
    ${building(993, 185, 173, 5, true)}
    ${crane(277, 335, 258, .94, 23, -4)}
    ${crane(745, 334, 245, .85, 27, -15)}
    ${crane(1250, 334, 260, 1, 25, -9, true)}
    <g transform="translate(502 272)">
      <path d="M0 1l174 -16 174 16v58H0" fill="#bcaa95"/>
      <path d="M-8 0l182 -20L355 0" stroke="#9b8070" fill="none" stroke-width="5"/>
      <rect y="10" width="348" height="49" fill="url(#stone)"/>
      ${repeat(11, i => use('arch', 13 + i * 30, 21))}
      <path d="M0 14h348" stroke="#e3d5c3" stroke-width="3"/>
    </g>
    <g transform="translate(835 330)">
      <path d="M-41 0v-89h13v-16h56v16h13V0z" fill="url(#stone)"/>
      <path d="M-26 -105v-55h52v55" fill="#c4b09b"/>
      <path d="M-23 -159v-30h46v30" fill="#deceb9"/>
      <path d="M-29 -188h58l-9 -9h-40z" fill="#9d8170"/>
      <path d="M-20 -198q0 -27 20 -34q20 7 20 34" fill="#965d57"/>
      <path d="M0 -232v-23m-7 7h14" stroke="#805044" stroke-width="3"/>
      ${repeat(3, i => `<path d="M${-16 + i * 13} -161v-20q4 -8 8 0v20" fill="#8c7664"/>`)}
      <path d="M-16 -107v-35a16 16 0 0 1 32 0v35" fill="#907866"/>
      <path d="M-10 -107v-34a10 10 0 0 1 20 0v34" fill="#c8b39a"/>
      <path d="M-29 -159h58M-30 -104h60M-42 -88h84" stroke="#e7d6bf" stroke-width="4"/>
      <path d="M-12 0v-44a12 12 0 0 1 24 0V0" fill="#746054"/>
      <path d="M-5 0v-42h10V0" fill="#98816a"/>
      <path d="M-36 -80V0M36 -80V0" stroke="#e0cdb4" stroke-width="5"/>
    </g>
    <g color="#bd9f93">${use('cypress', 531, 332, .95)}${use('cypress', 550, 332, 1.2)}${use('cypress', 903, 332, 1.1)}${use('palm', 955, 332, 1.22)}</g>
    <g color="#92233a">${use('tree', 42, 343, .58)}${use('tree', 315, 342, .78)}${use('tree', 460, 343, .7)}${use('tree', 970, 343, .67)}${use('tree', 1360, 341, .72)}</g>
    <g color="#741d31">${use('tree', 16, 347, .57)}${use('tree', 286, 345, .52)}${use('cypress', 477, 347, .72)}${use('tree', 934, 345, .5)}${use('tree', 1327, 346, .55)}${use('tree', 1413, 345, .72)}</g>
    <path d="M0 343h1440v37H0z" fill="#e8ddd0"/>
    <path d="M0 345h1440" stroke="#907c6c" stroke-width="2"/>
    <path d="M0 367h1440" stroke="#c5b5a4" stroke-width=".8"/>
    <g transform="translate(86 345)"><path d="M0 0v-39h146V0" fill="#d2c0a9"/><path d="M0 -39h146v-5H0z" fill="#ac9681"/><text x="73" y="-24" text-anchor="middle" fill="#6c574c" font-family="Georgia,serif" font-size="8" letter-spacing="2">ASSUMPTION</text><text x="73" y="-12" text-anchor="middle" fill="#6c574c" font-family="Georgia,serif" font-size="8" letter-spacing="2">UNIVERSITY</text></g>
    <rect x="345" y="322" width="107" height="23" fill="#b3a291"/><rect x="345" y="322" width="107" height="23" fill="url(#fence)"/>
    ${repeat(4, i => use('lamp', 492 + i * 166, 349, .84))}
    ${use('person', 483, 347, .72)}${use('person', 665, 348, .8)}${use('person', 679, 348, .72)}
    <g transform="translate(1020 344)"><g class="worker-walk motion">${use('worker', 0, 0, .78)}</g></g>
    <g transform="translate(1189 347)"><path d="M0 0v-33m58 33v-33" stroke="#746256" stroke-width="2"/><path d="M-5 -33h69l-8 -6H3z" fill="#997b69"/><rect x="5" y="-31" width="47" height="23" fill="#d1bca5" opacity=".4"/><path d="M6 -7h43m-38 0v7m34 -7v7" stroke="#876f5e" stroke-width="2"/></g>
    <g transform="translate(0 357)"><g class="shuttle motion">${use('shuttle', 0, 0, .88)}</g></g>
    <path d="M0 379h1440" stroke="#bba999" stroke-width="2"/>
  </svg>`;
}
