---
id: diesel
section: gas-cycle
order: 3
title: ディーゼルサイクルの効率
formula: η = 1 − (1/ε^(κ−1))·(σ^κ−1)/(κ(σ−1))
issue: 466
year: 2021
prereq: [otto]
---

# ディーゼルサイクルの効率

> **ゴール**: 断熱圧縮→等圧受熱→断熱膨張→等積放熱からなるディーゼルサイクルで、締切比 $\sigma$ を導入し、効率 $\eta=1-\dfrac{1}{\varepsilon^{\kappa-1}}\dfrac{\sigma^\kappa-1}{\kappa(\sigma-1)}$ を導け、$\sigma\to1$ でオットーに一致することを言える。

## 物理状況

ディーゼルサイクルは圧縮着火機関（ディーゼルエンジン）の理想モデル。空気だけを高圧縮して高温にし、そこへ燃料を噴射して**燃やしながら膨張**させる。過程は：

1. **断熱圧縮**（$1\to2$、空気を強く圧縮し着火温度以上に）
2. **等圧受熱**（$2\to3$、燃料噴射・燃焼。ピストンが動きつつ圧力一定で加熱）
3. **断熱膨張**（$3\to4$、出力行程）
4. **等積放熱**（$4\to1$、排気）

オットーとの違いは**加熱が等圧**な点だけ（オットーは等積加熱）。p-v 線図では $2\to3$ が水平線（等圧）になる。

@@FIG:diesel-diagrams@@

## 設定

理想気体 $1\,\mathrm{kg}$、比熱比 $\kappa$ 一定。状態点 $1\to2\to3\to4\to1$。**圧縮比** $\varepsilon=v_1/v_2$ に加え、燃焼でどこまで膨張するかを表す**締切比（cut-off ratio）**を

$$
\sigma = \frac{v_3}{v_2}
$$

と定義する（$v_3>v_2$ なので $\sigma>1$）。等圧過程の熱は $\delta q=c_p\,dT$、等積過程の熱は $\delta q=c_v\,dT$。いずれも第一法則 $\delta q=du+p\,dv$ から出る——等圧では $\delta q=d(u+pv)=dh=c_p\,dT$、等積では $dv=0$ で $\delta q=c_v\,dT$。断熱過程は同じ第一法則から出る $pv^{\kappa}=\text{const}$ を使う。

## ステップ1: 等圧受熱

$2\to3$ は圧力一定の加熱なので、定圧比熱 $c_p$ を使う：

$$
q_H = c_p\,(T_3 - T_2)
$$

## ステップ2: 等積放熱

$4\to1$ は体積一定なので、定積比熱 $c_v$ を使う：

$$
q_L = c_v\,(T_4 - T_1)
$$

## ステップ3: 効率の定義

$$
\eta = 1 - \frac{q_L}{q_H} = 1 - \frac{c_v(T_4 - T_1)}{c_p(T_3 - T_2)} = 1 - \frac{1}{\kappa}\cdot\frac{T_4 - T_1}{T_3 - T_2}
$$

ここで $c_p/c_v=\kappa$ を使った。あとは4つの温度を $T_1$・$\varepsilon$・$\sigma$ で表す。

## ステップ4: 各点の温度を $T_1$ で表す

**$1\to2$ 断熱圧縮**：$Tv^{\kappa-1}=\text{const}$ より

$$
T_2 = T_1\Bigl(\frac{v_1}{v_2}\Bigr)^{\kappa-1} = T_1\,\varepsilon^{\kappa-1}
$$

**$2\to3$ 等圧受熱**：圧力一定だから $v/T=\text{const}$（理想気体）。よって

$$
T_3 = T_2\frac{v_3}{v_2} = T_2\,\sigma = T_1\,\varepsilon^{\kappa-1}\sigma
$$

**$3\to4$ 断熱膨張**：$Tv^{\kappa-1}=\text{const}$。膨張の体積比は $v_4/v_3=v_1/v_3$。ここで $v_1=\varepsilon v_2$、$v_3=\sigma v_2$ なので $v_4/v_3=\varepsilon/\sigma$。したがって

$$
T_4 = T_3\Bigl(\frac{v_3}{v_4}\Bigr)^{\kappa-1} = T_3\Bigl(\frac{\sigma}{\varepsilon}\Bigr)^{\kappa-1} = T_1\,\varepsilon^{\kappa-1}\sigma\cdot\frac{\sigma^{\kappa-1}}{\varepsilon^{\kappa-1}} = T_1\,\sigma^{\kappa}
$$

## ステップ5: 温度差を代入

分子と分母の温度差を作る：

$$
T_4 - T_1 = T_1(\sigma^\kappa - 1)
$$

$$
T_3 - T_2 = T_1\varepsilon^{\kappa-1}\sigma - T_1\varepsilon^{\kappa-1} = T_1\varepsilon^{\kappa-1}(\sigma - 1)
$$

ステップ3へ代入すると $T_1$ が約分で消えて、

$$
\eta = 1 - \frac{1}{\kappa}\cdot\frac{T_1(\sigma^\kappa - 1)}{T_1\varepsilon^{\kappa-1}(\sigma - 1)} = 1 - \frac{1}{\varepsilon^{\kappa-1}}\cdot\frac{\sigma^\kappa - 1}{\kappa(\sigma - 1)}
$$

## 結論

$$
\boxed{\,\eta_\text{Diesel} = 1 - \dfrac{1}{\varepsilon^{\kappa-1}}\cdot\dfrac{\sigma^{\kappa}-1}{\kappa(\sigma-1)}\,}
$$

第1因子 $1/\varepsilon^{\kappa-1}$ はオットーと同じで、後ろに**締切比の補正項** $\dfrac{\sigma^\kappa-1}{\kappa(\sigma-1)}$ が掛かる。この補正項は $\sigma>1$ で必ず1より大きいので、同じ圧縮比なら $\eta_\text{Diesel}<\eta_\text{Otto}$。

## つながり

- **🏗️ 往復機関（力学・燃焼）**: ディーゼルは圧縮着火レシプロエンジンのモデル。空気だけを高圧縮（実機で約 30 気圧）して着火温度まで上げてから燃料を噴射するので火花プラグが要らない。等圧受熱 $2\to3$ は「ピストンが動きながら燃やす」行程そのもので、締切比 $\sigma=v_3/v_2$ が噴射を打ち切るタイミング（燃料量）に対応する。
- **🌀 作動流体の断熱関係**: 各点の温度を結んだ $Tv^{\kappa-1}=\text{const}$ は[断熱変化](#/adiabatic-polytropic)の関係で、[オットー](#/otto)と共通の道具。違いは加熱が等圧（$c_p$）か等積（$c_v$）かだけで、$\sigma\to1$ の極限で補正項が $1$ に落ちオットーに連続的に一致する。

> **ポイント**: $\sigma\to1$（締切比1＝加熱量ゼロの極限）では補正項が $\dfrac{\sigma^\kappa-1}{\kappa(\sigma-1)}\to1$（ロピタル）となり、$\eta\to1-1/\varepsilon^{\kappa-1}$＝**オットーに一致**する。等圧加熱だから $q_H$ は $c_p$、等積放熱だから $q_L$ は $c_v$ → 比に $\kappa$ が残る、を取り違えないこと。$T_4=T_1\sigma^\kappa$ がきれいに出るのが見せ場。
