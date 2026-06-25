---
id: adiabatic-polytropic
section: first-law
order: 5
title: 断熱(等エントロピー)・ポリトロープ変化
formula: pv^κ = const, pv^n = const, w=(p₁v₁−p₂v₂)/(n−1)
issue: 463
year: 2023
prereq: [first-law-closed]
---

# 断熱(等エントロピー)・ポリトロープ変化

> **ゴール**: $\delta q=0$ から $pv^\kappa=\text{const}$ を導け（$c_v\,dT=-p\,dv$ と $pv=RT$ を使う）、$T$-$v$／$T$-$p$ 関係と仕事 $w=c_v(T_1-T_2)=\dfrac{p_1v_1-p_2v_2}{\kappa-1}$ を出せ、ポリトロープ $pv^n=\text{const}$ で $n$ を一般化して4過程を統一できる。

## 物理状況

熱の出入りを断った（断熱）まま準静的に膨張・圧縮する。熱が入らないので、気体がする仕事はすべて内部エネルギーの減少でまかなわれる——膨張すれば温度が下がる。$p$-$v$ 線図では等温線（双曲線）より**急な**曲線 $pv^\kappa=\text{const}$ を描く。さらに指数を $n$ に一般化すると、等圧・等温・断熱・等積を1本の式 $pv^n=\text{const}$ で表せる。

**出発点はいつもの第一法則** [$\delta q=du+p\,dv$](#/first-law-closed)。この過程ページがやることは、ここに「断熱（$\delta q=0$）」を入れるだけ——左辺が消えて $c_v\,dT=-p\,dv$ になり、あとは $pv=RT$ で整理していくだけになる。

@@FIG:adiabatic-vs-isothermal@@

## 設定

理想気体 $1\,\mathrm{kg}$、状態方程式 [$pv=RT$](#/ideal-gas)、$du=c_v\,dT$、比熱比 $\kappa=c_p/c_v$、マイヤー [$c_p-c_v=R$](#/mayer)。準静的・断熱（$\delta q=0$）変化。

## ステップ1: 断熱条件を第一法則に入れる

$\delta q=0$ を第一法則 $\delta q=du+p\,dv$ に代入し、$du=c_v\,dT$ を使う：

$$
c_v\,dT = -\,p\,dv
$$

## ステップ2: dT を v の式に変える

状態方程式 $pv=RT$ を微分すると $p\,dv+v\,dp=R\,dT$、すなわち $dT=\dfrac{p\,dv+v\,dp}{R}$。これをステップ1に入れる：

$$
\frac{c_v}{R}(p\,dv+v\,dp) = -\,p\,dv
$$

## ステップ3: 比熱比 κ でまとめる

両辺に $R/c_v$ を掛け、$R/c_v=(c_p-c_v)/c_v=\kappa-1$ を使うと、

$$
p\,dv + v\,dp = -(\kappa-1)\,p\,dv
\;\Longrightarrow\;
v\,dp = -\kappa\,p\,dv
$$

## ステップ4: 変数分離して積分

$\dfrac{dp}{p} = -\kappa\dfrac{dv}{v}$ を積分すると $\ln p = -\kappa\ln v+\text{const}$、よって

$$
pv^\kappa = \text{const}
$$

$pv=RT$ を併用すると $Tv^{\kappa-1}=\text{const}$、$Tp^{(1-\kappa)/\kappa}=\text{const}$ も得られる。

## ステップ5: 断熱の仕事

断熱では $q=0$ なので第一法則より $w=-\Delta u=-c_v(T_2-T_1)=c_v(T_1-T_2)$。$c_v=R/(\kappa-1)$ と $RT=pv$ を使って書き直すと、

$$
w = c_v(T_1-T_2) = \frac{R(T_1-T_2)}{\kappa-1} = \frac{p_1v_1-p_2v_2}{\kappa-1}
$$

## ステップ6: ポリトロープへの一般化

実際の過程は完全な断熱でも等温でもなく、その中間にあることが多い。指数を一般の $n$ にした $pv^n=\text{const}$ にすると、冒頭で予告した等圧・等温・断熱・等積を $n$ の値ひとつで使い分けられる。同じ計算で仕事は、

$$
w = \frac{p_1v_1-p_2v_2}{n-1}\qquad
\begin{cases}
n=0 & \text{等圧}\\
n=1 & \text{等温}\\
n=\kappa & \text{断熱}\\
n\to\infty & \text{等積}
\end{cases}
$$

ただし $n=1$（等温）は分母 $n-1=0$ となりこの式が使えない。等温だけは別式 $w=RT\ln(v_2/v_1)$（→[等温変化](#/isothermal)）に切り替える。

## 結論

$$
\boxed{\;pv^\kappa=\text{const},\quad pv^n=\text{const},\quad w=\dfrac{p_1v_1-p_2v_2}{n-1}\;}
$$

## つながり

- **🔥 第一法則**: 断熱は [$\delta q=du+p\,dv$](#/first-law-closed) に $\delta q=0$ を入れただけ。仕事はすべて内部エネルギーの減少でまかなわれ、$w=-\Delta u=c_v(T_1-T_2)$ になる。「何を 0 と置くか」が等温（$du=0$）と裏返しの関係。
- **🌀 流体（等エントロピー流れ）**: 断熱関係 $pv^\kappa=\text{const}$ は、圧縮性流れの**等エントロピー流れ**でそのまま再利用される。音速 $a=\sqrt{\kappa RT}$ の $\kappa$ はここの比熱比そのもので、ノズル・衝撃波・マッハ数の議論はこの状態関係が土台。だから「速い圧縮は断熱に近い」（[等温変化](#/isothermal) と対比）。
- **⚖️ 第二法則・エントロピー（伏線）**: 可逆な断熱は $dS=\delta q/T=0$ すなわち**等エントロピー**。「断熱かつ可逆 ⇒ 等エントロピー」は後のエントロピー節で $T$-$s$ 線図上の**鉛直線**として効き、カルノーサイクルの断熱行程の正体になる。

> **ポイント**: 可逆断熱＝**等エントロピー**（$\delta q=0$ かつ可逆なら $dS=\delta q/T=0$）。指数が $\kappa$ より大（$pv^\kappa$）なので断熱線は等温線より急——同じ膨張で圧力がより速く落ちる。$n=1$（等温）では分母 $n-1=0$ となり $w=\dfrac{p_1v_1-p_2v_2}{n-1}$ は使えず $RT\ln(v_2/v_1)$ に切り替えること。試験では「$c_v\,dT=-p\,dv$ から出発」が王道。
