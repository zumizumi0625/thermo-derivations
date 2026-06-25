---
id: ts-diagram
section: entropy
order: 5
title: T-s線図＝面積が熱量・各過程のT-s勾配
formula: δq = T ds,  (∂T/∂s) = T/c
issue: 477
year: 2026
prereq: [clausius]
---

# T-s 線図＝面積が熱量・各過程の T-s 勾配

> **ゴール**: $\delta q_{rev}=T\,ds$ から「T-s 線図の曲線下面積＝授受熱量」を言え、等温＝水平・可逆断熱＝垂直を即答できる。定積・定圧線の勾配 $(\partial T/\partial s)_v=T/c_v$、$(\partial T/\partial s)_p=T/c_p$ を導き、**定積線の方が急**である理由を説明できる。

## 物理状況

p-v 線図で曲線下の面積が**仕事** $\int p\,dv$ を表すのに対し、T-s 線図では曲線下の面積が**熱量** $\int T\,ds$ を表す。これはサイクルの熱の出入りを一目で読むための強力な道具で、特にカルノーサイクルが T-s 上で長方形になることから効率計算が瞬時にできる。各過程が T-s 上でどんな線になるか・勾配がどう決まるかを押さえる。

出発点はエントロピーの定義 $dS=\delta q_{rev}/T$（その根は第一法則 $\delta q=du+p\,dv$）。これを $\delta q_{rev}=T\,ds$ と読み替えるだけで「面積＝熱量」が出る。第一法則の「仕事 $p\,dv$」が p-v 図の面積だったのと完全に対をなす。

@@FIG:ts-area@@

## 設定

$1\,\mathrm{kg}$ あたりの比エントロピー $s$ を横軸、絶対温度 $T$ を縦軸にとる。可逆過程を考え、比熱は一定とする。

## ステップ1: 面積＝熱量（$\delta q=T\,ds$）

エントロピーの定義 $dS=\delta q_{rev}/T$ を $\delta q$ について解くと、

$$
\delta q_{rev}=T\,ds
$$

これを過程 1→2 で積分すれば

$$
q_{12}=\int_1^2 T\,ds=(\text{T-s 曲線の下の面積})
$$

幅 $ds$・高さ $T$ の短冊を足し合わせた面積がそのまま熱量になる。

## ステップ2: 代表過程の形

- **等温過程**: $T=$ 一定 → **水平線**。面積 $=T\,\Delta s=q$。
- **可逆断熱過程**: $\delta q=0$ → $ds=0$ → $s=$ 一定 → **垂直線**（等エントロピー線）。

@@FIG:ts-processes@@

したがって**カルノーサイクル（等温2本＋断熱2本）は T-s 上で長方形**になり、面積比から効率 $\eta=1-T_L/T_H$ が直読できる。

## ステップ3: 定積線・定圧線の勾配

定積では $\delta q=c_v\,dT$、定圧では $\delta q=c_p\,dT$。これを $T\,ds=\delta q$ に入れる。

定積（$v$ 一定）：

$$
T\,ds=c_v\,dT
\;\Longrightarrow\;
\boxed{\left(\frac{\partial T}{\partial s}\right)_v=\frac{T}{c_v}}
$$

定圧（$p$ 一定）：

$$
T\,ds=c_p\,dT
\;\Longrightarrow\;
\boxed{\left(\frac{\partial T}{\partial s}\right)_p=\frac{T}{c_p}}
$$

## ステップ4: どちらが急か

マイヤーの関係 $c_p-c_v=R>0$ より $c_v<c_p$。同じ温度 $T$ で勾配を比べると、

$$
\left(\frac{\partial T}{\partial s}\right)_v=\frac{T}{c_v}>\frac{T}{c_p}=\left(\frac{\partial T}{\partial s}\right)_p
$$

すなわち**定積線の方が定圧線より急**に立ち上がる。物理的には「定圧では受け取った熱の一部が膨張仕事に回る分、同じ $\Delta s$ あたりの温度上昇が緩い」ということ。

@@FIG:ts-slope-compare@@

## 結論

$$
\boxed{\;\delta q_{rev}=T\,ds,\qquad
\left(\frac{\partial T}{\partial s}\right)_v=\frac{T}{c_v},\quad
\left(\frac{\partial T}{\partial s}\right)_p=\frac{T}{c_p}\;(<\text{定積})\;}
$$

## つながり

- **🔥 第一法則（p-v ↔ T-s）**: 第一法則 $\delta q=du+p\,dv$ の右辺2つがそれぞれ別の線図の面積になる——仕事 $\int p\,dv$ は **p-v 図**の面積、熱 $\int T\,ds$ は **T-s 図**の面積。サイクル一周では囲む面積が一致し $\oint T\,ds=\oint p\,dv$（正味熱＝正味仕事）。
- **⚖️ 第二法則 / カルノー**: 等温＝水平・可逆断熱＝垂直なので[カルノーサイクル](#/carnot)は T-s 上で長方形、面積比から $\eta=1-T_L/T_H$ が直読できる。不可逆過程は右へ寝る（$\Delta s>0$）ので、図の上で「どれだけ仕事を取り逃したか」が面積で見える。
- **🌀 流体（タービン・ノズル効率）**: 断熱機器の理想は垂直な等エントロピー線、実際は損失で右に倒れた線。断熱効率はこの「理想の $\Delta h$」と「実際の $\Delta h$」の比で、T-s 図上の傾きのずれとして読み取る。

> **ポイント**: 「p-v は仕事の面積、T-s は熱の面積」をペアで覚える。等温＝水平・断熱＝垂直は反射で出せるように。定積線が定圧線より急（$c_v<c_p$ だから）は頻出。サイクルの正味熱＝囲む面積、その正味熱が正味仕事に等しい（$\oint T\,ds=\oint p\,dv$）のもこの図から見える。

