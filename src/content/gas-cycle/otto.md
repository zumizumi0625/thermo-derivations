---
id: otto
section: gas-cycle
order: 2
title: オットーサイクルの効率
formula: η = 1 − ε^−(κ−1)
issue: 465
year: 2026
prereq: [adiabatic-polytropic]
---

# オットーサイクルの効率

> **ゴール**: 2断熱2等積からなるオットーサイクル（火花点火機関のモデル）で、受熱・放熱を等積比熱で書き、断熱関係 $Tv^{\kappa-1}=\text{const}$ を使って効率 $\eta=1-\varepsilon^{-(\kappa-1)}$ を圧縮比 $\varepsilon$ だけの式に落とせる。

## 物理状況

オットーサイクルはガソリンエンジン（火花点火機関）の理想モデル。ピストンが上下するシリンダ内で、次の4過程を回す：

1. **断熱圧縮**（$1\to2$、ピストンが気体を一気に押し縮める）
2. **等積受熱**（$2\to3$、点火・燃焼で瞬間的に加熱。体積は変わらない）
3. **断熱膨張**（$3\to4$、高圧ガスがピストンを押し下げ仕事をする＝出力行程）
4. **等積放熱**（$4\to1$、排気で熱を捨てる。体積は変わらない）

加熱・放熱がどちらも**等積**で起きるのが特徴。p-v 線図では2本の断熱線を2本の鉛直線（等積）でつないだ形になる。

@@FIG:otto-diagrams@@

## 設定

作動流体は理想気体 $1\,\mathrm{kg}$、比熱比 $\kappa=c_p/c_v$ は一定とする。状態点 $1\to2\to3\to4\to1$。最大体積 $v_1=v_4$、最小体積 $v_2=v_3$。**圧縮比**を

$$
\varepsilon = \frac{v_1}{v_2}
$$

と定義する。等積過程の熱は $\delta q = c_v\,dT$ で計算できる。

## ステップ1: 等積受熱

$2\to3$ は体積一定の加熱。等積比熱 $c_v$ を使い、受熱量は温度差で

$$
q_H = c_v\,(T_3 - T_2)
$$

## ステップ2: 等積放熱

$4\to1$ も体積一定。外へ捨てる熱を正の大きさで書くと

$$
q_L = c_v\,(T_4 - T_1)
$$

## ステップ3: 効率の定義

正味仕事は受熱と放熱の差なので、効率は

$$
\eta = 1 - \frac{q_L}{q_H} = 1 - \frac{c_v(T_4 - T_1)}{c_v(T_3 - T_2)} = 1 - \frac{T_4 - T_1}{T_3 - T_2}
$$

ここから先は、温度比を圧縮比 $\varepsilon$ で表すのが仕事になる。

## ステップ4: 断熱関係で温度を結ぶ

可逆断熱では $Tv^{\kappa-1}=\text{const}$（[ポリトロープ／断熱変化](#/adiabatic-polytropic)より）。圧縮 $1\to2$ と膨張 $3\to4$ に適用：

$$
T_1 v_1^{\kappa-1} = T_2 v_2^{\kappa-1}, \qquad T_4 v_4^{\kappa-1} = T_3 v_3^{\kappa-1}
$$

$v_1=v_4$、$v_2=v_3$ なので、両式とも同じ体積比 $\bigl(v_1/v_2\bigr)^{\kappa-1}=\varepsilon^{\kappa-1}$ が現れる：

$$
\frac{T_2}{T_1} = \varepsilon^{\kappa-1}, \qquad \frac{T_3}{T_4} = \varepsilon^{\kappa-1}
$$

## ステップ5: 温度比を消す

上の2式から $T_2 = T_1\varepsilon^{\kappa-1}$、$T_3=T_4\varepsilon^{\kappa-1}$。これをステップ3の分母に代入すると

$$
\eta = 1 - \frac{T_4 - T_1}{T_4\varepsilon^{\kappa-1} - T_1\varepsilon^{\kappa-1}} = 1 - \frac{T_4 - T_1}{\varepsilon^{\kappa-1}\,(T_4 - T_1)}
$$

$(T_4-T_1)$ がきれいに約分されて、

$$
\eta = 1 - \frac{1}{\varepsilon^{\kappa-1}}
$$

## 結論

$$
\boxed{\,\eta_\text{Otto} = 1 - \dfrac{1}{\varepsilon^{\kappa-1}} = 1 - \varepsilon^{-(\kappa-1)}\,}
$$

効率は**圧縮比 $\varepsilon$ と比熱比 $\kappa$ だけ**で決まり、加熱量（アクセルの踏み具合）にはよらない。圧縮比を上げるほど効率が上がるが、実機ではノッキング（自己着火）で上限がある。

> **ポイント**: $(T_4-T_1)$ が約分で消えるのが山場。「2断熱2等積」「熱は等積だから $c_v$」「断熱で温度比＝$\varepsilon^{\kappa-1}$」の3点を押さえれば再現できる。$\varepsilon=v_1/v_2$（最大/最小、1より大）を逆に取らないこと。
