const palette = [0xFF577F, 0xFF9884B, 0xFFC764, 0xCDFFFC];
const outlineColor = 0x2D2D2D;
const connectionColor = 0x555555;
const radius = 40;
const lineWidth = 6;
const connectionWidth = 4;

// Create the application helper and add its render target to the page
let app = new PIXI.Application({
    width: 1920, height: 1080, antialias: true, autoDensity: true, resolution: window.devicePixelRatio,
    backgroundColor: 0xFFFAFA
});
document.body.appendChild(app.view);

const inventory = new PIXI.Graphics()
inventory.lineStyle({ width: lineWidth, color: outlineColor })
inventory.beginFill(palette[0], 1)
inventory.drawCircle(160, 120, 80)
inventory.endFill()

const fas = new PIXI.Graphics()
fas.lineStyle({ width: lineWidth, color: outlineColor })
fas.beginFill(palette[1], 1)
fas.drawCircle(460, 120, 80)
fas.endFill()

const cir1 = [360, 700, 120]
const cir2 = [1000, 300, 80]

const orders = new PIXI.Graphics()
orders.lineStyle({ width: lineWidth, color: outlineColor })
orders.beginFill(palette[2], 1)
orders.drawCircle(...cir1)
orders.endFill()

const productCatalog = new PIXI.Graphics()
productCatalog.lineStyle({ width: lineWidth, color: outlineColor })
productCatalog.beginFill(palette[3], 1)
productCatalog.drawCircle(...cir2)
productCatalog.endFill()

app.stage.addChild(inventory)
app.stage.addChild(fas)
app.stage.addChild(orders)
app.stage.addChild(productCatalog)

function drawLine(x1, y1, r1, x2, y2, r2) {
    const connection = new PIXI.Graphics();
    connection.lineStyle({ width: connectionWidth, color: 0xFF0000 })


    mx = (x1 + x2) / 2
    my = (y1 + y2) / 2

    vectbx = y1 - y2
    vectby = x2 - x1
    magb = Math.sqrt(vectbx * vectbx + vectby * vectby)

    normVectbx = vectbx / magb
    normVectby = vectby / magb

    alpha = 120

    // Plus minus depending on clockwise/counterclockwise
    cx = mx - normVectbx * alpha
    cy = my - normVectby * alpha

    // connection.moveTo(x1, y1);
    // connection.quadraticCurveTo(cx, cy, x2, y2);

    vi1x = cx - x1
    vi1y = cy - y1

    vi1mag = Math.sqrt(vi1x * vi1x + vi1y * vi1y)

    vi1x = vi1x / vi1mag
    vi1y = vi1y / vi1mag

    i1x = x1 + vi1x * (r1 + 10)
    i1y = y1 + vi1y * (r1 + 10)
    ii1x = x1 + vi1x * (r1 + 10)
    ii1y = y1 + vi1y * (r1 + 10)

    vi2x = cx - x2
    vi2y = cy - y2

    vi2mag = Math.sqrt(vi2x * vi2x + vi2y * vi2y)

    vi2x = vi2x / vi2mag
    vi2y = vi2y / vi2mag

    i2x = x2 + vi2x * (r2 + 10)
    i2y = y2 + vi2y * (r2 + 10)
    ii2x = x2 + vi2x * (r2 + 10)
    ii2y = y2 + vi2y * (r2 + 10)

    cx = mx - normVectbx * alpha
    cy = my - normVectby * alpha

    connection.lineStyle({ width: connectionWidth, color: connectionColor })
    connection.moveTo(i1x, i1y)
    connection.quadraticCurveTo(cx, cy, i2x, i2y)

    const arrowTailLength = 30

    rvx = i2x - cx
    rvy = i2y - cy

    mrv = Math.sqrt(rvx * rvx + rvy * rvy)

    rvx = rvx / mrv
    rvy = rvy / mrv

    const laa = Math.PI * 0.8;
    lavx = rvx * Math.cos(laa) - rvy * Math.sin(laa)
    lavy = rvx * Math.sin(laa) + rvy * Math.cos(laa)
    // lavx = rvx
    // lavy = rvy
    connection.moveTo(ii2x, ii2y)
    connection.lineTo(ii2x + lavx * arrowTailLength, ii2y + lavy * arrowTailLength)

    const raa = Math.PI * 1.2;
    ravx = rvx * Math.cos(raa) - rvy * Math.sin(raa)
    ravy = rvx * Math.sin(raa) + rvy * Math.cos(raa)
    // ravx = rvx
    // ravy = rvy
    connection.moveTo(ii2x, ii2y)
    connection.lineTo(ii2x + ravx * arrowTailLength, ii2y + ravy * arrowTailLength)

    // connection.moveTo(ii2x, ii2y);
    connection.drawRect(ii2x, ii2y, 0.2, 0.2)

    return connection
}

app.stage.addChild(drawLine(cir1[0], cir1[1], cir1[2], cir2[0], cir2[1], cir2[2]))
app.stage.addChild(drawLine(cir2[0], cir2[1], cir2[2], cir1[0], cir1[1], cir1[2]))
app.stage.addChild(drawLine(cir1[0], cir1[1], cir1[2], 160, 120, 80))
app.stage.addChild(drawLine(160, 120, 80, cir1[0], cir1[1], cir1[2]))